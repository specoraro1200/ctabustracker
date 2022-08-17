import requests
import mysql.connector
mydb = mysql.connector.connect(
        host="timelinessofctabuses9008.cfai3nm0tmno.us-east-1.rds.amazonaws.com",
        user="nergigante5678",
        port=3306,
        password="2*sPq*EFf6MH7qUZxt2z",
        database="CTA"
    )
mycursor = mydb.cursor()

routeNumbers= ["1", "2" ,"3" ,"4" ,"5" ,"6" ,"7" ,"8" ,"8A" ,"9" ,"X9" ,"10" ,"11" ,"12" ,"J14" ,"15" ,"18" ,"19" ,"20" ,"21" ,"22" ,"24" ,"26" ,"28" ,"29" ,"30" ,"31" ,"34" ,"35" ,"36" ,"37" ,"39" ,"43" ,"44" ,"47" ,"48" ,"49" ,"49B" ,"X49" ,"50" ,"51" ,"52" ,"52A" ,"53" ,"53A" ,"54" ,"54A" ,"54B" ,"55" ,"55A" ,"55N" ,"56","57" ,"59" ,"60" ,"62" ,"62H" ,"63" ,"63W","65" ,"66" ,"67" ,"68" ,"70" ,"71" ,"72" ,"73" ,"74" ,"75" ,"76" ,"77" ,"78" ,"79" ,"80" ,"81" ,"81W" ,"82" ,"84" ,"85" ,"85A" ,"86" ,"87" ,"88" ,"90" ,"91" ,"92" ,"93" ,"94" ,"95" ,"96" ,"97" ,"X98" ,"100" ,"103" ,"106" ,"108" ,"111" ,"111A" ,"112" ,"115" ,"119" ,"120" ,"121" ,"124" ,"125" ,"126" ,"130" ,"134" ,"135" ,"136" ,"143" ,"146" ,"147" ,"148" ,"151" ,"152" ,"155" ,"156" ,"157" ,"165" ,"169" ,"171" ,"172" ,"192", "201", "206"]
start = 0

for i in range(0,13):
    array = []
    tenVariables = routeNumbers[start: start+10]
    tenVariables = ",".join(tenVariables)
    store = ("http://www.ctabustracker.com/bustime/api/v2/getvehicles?key=Ph2VjWCh3hRRKyqERyPYdYLjs&rt=%s&format=json" % str(tenVariables))
    store=requests.get(store)
    print(store.text)
    start += 10
    if "vehicle" not in store.text:
        continue
    response = store.json()["bustime-response"]["vehicle"]
    print(len(response),"HERERERER")
    for x in range(0,len(response)):
        vid = response[x]["vid"]
        rt = response[x]["rt"]
        dly = response[x]["dly"]
        tmstmp = response[x]["tmstmp"]
        if(vid != None):
            array.append((0,vid,rt,dly,tmstmp))
    print(array)
    mycursor.executemany("insert into Buses(id,vid,rt,dly,tmstmp) values (%s,%s,%s,%s,%s)",array)
    mydb.commit()
