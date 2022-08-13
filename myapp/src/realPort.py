import requests
import pymysql
import sys
import os

rds_host  = (os.environ['host'])
name = (os.environ['user'])
password = (os.environ['password'])
db_name = (os.environ['database'])

try:
    conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name,connect_timeout = 5)
except pymysql.MySQLError as e:
    sys.exit()

mycursor = conn.cursor()
    
routeNumbers= ["1", "2" ,"3" ,"4" ,"5" ,"6" ,"7" ,"8" ,"8A" ,"9" ,"X9" ,"10" ,"11" ,"12" ,"J14" ,"15" ,"18" ,"19" ,"20" ,"21" ,"22" ,"24" ,"26" ,"28" ,"29" ,"30" ,"31" ,"34" ,"35" ,"36" ,"37" ,"39" ,"43" ,"44" ,"47" ,"48" ,"49" ,"49B" ,"X49" ,"50" ,"51" ,"52" ,"52A" ,"53" ,"53A" ,"54" ,"54A" ,"54B" ,"55" ,"55A" ,"55N" ,"56","57" ,"59" ,"60" ,"62" ,"62H" ,"63" ,"63W","65" ,"66" ,"67" ,"68" ,"70" ,"71" ,"72" ,"73" ,"74" ,"75" ,"76" ,"77" ,"78" ,"79" ,"80" ,"81" ,"81W" ,"82" ,"84" ,"85" ,"85A" ,"86" ,"87" ,"88" ,"90" ,"91" ,"92" ,"93" ,"94" ,"95" ,"96" ,"97" ,"X98" ,"100" ,"103" ,"106" ,"108" ,"111" ,"111A" ,"112" ,"115" ,"119" ,"120" ,"121" ,"124" ,"125" ,"126" ,"130" ,"134" ,"135" ,"136" ,"143" ,"146" ,"147" ,"148" ,"151" ,"152" ,"155" ,"156" ,"157" ,"165" ,"169" ,"171" ,"172" ,"192", "201", "206"]
start = 0

for i in range(0,13):
    array = []
    vehiclesArray = []
    tenVariables = routeNumbers[start: start+10]
    tenVariables = ",".join(tenVariables)
    store = ("http://www.ctabustracker.com/bustime/api/v2/getvehicles?key=Ph2VjWCh3hRRKyqERyPYdYLjs&rt=%s&format=json" % str(tenVariables))
    store=requests.get(store)
    start += 10
    print(store)
    if "vehicle" not in store.text:
        print("H")
        continue
    response = store.json()["bustime-response"]["vehicle"]
    for x in range(0,len(response)):
        print('32')

        vid = response[x]["vid"]
        rt = response[x]["rt"]
        dly = response[x]["dly"]
        tmstmp = response[x]["tmstmp"]
        if(vid != None):
            array.append((0,vid,rt,dly,tmstmp))
            Delay = -1
            NoDelay = -1
            if(dly == 0):
                NoDelay = 1
                Delay = 0
            else:
                NoDelay = 0
                Delay = 1
            vehiclesArray.append((str(vid),str(rt),int(Delay),int(NoDelay)))       

    mycursor.executemany("INSERT INTO Vehicles (vid,rt,Delay,NoDelay) VALUES (%s,%s,%s,%s) ON DUPLICATE KEY UPDATE Delay = Delay + Values(Delay), NoDelay = NoDelay + Values(NoDelay)",vehiclesArray)
    conn.commit()
    # mycursor.executemany("INSERT INTO Vehicles (vid,rt,Delay,NoDelay) VALUES (%s,%s,%s,%s) ON DUPLICATE KEY UPDATE Delay = Delay + %s, NoDelay = NoDelay + %s;",vehiclesArray)
    # mydb.commit()
    # store = mycursor.fetchall()
    # print(vehiclesArray,store)
    mycursor.executemany("insert into RawData(id,vid,rt,dly,tmstmp) values (%s,%s,%s,%s,%s)",array)
    conn.commit()

    # mydb.commit()d