#!/bin/bash
routeNumbers=(2 3 4 5 6 7 8 8A 9 X9 10 11 12 J14 15 18 19 20 21 22 24 26 28 29 30 31 34 35 36 37 39 43 44 47 48 49 49B X49 50 51 52 52A 53 53A 54 54A 54B 55 55A 55N 5657 59 60 62 62H 63 63W 65 66 67 68 70 71 72 73 74 75 76 77 78 79 80 81 81W 82 84 85 85A 86 87 88 90 91 92 93 94 95 96 97 X98 100 103 106 108 111 111A 112 115 119 120 121 124 125 126 130 134 135 136 143 146 147 148 151 152 155 156 157 165 169 171 172 192 201 206)
declare index=0
declare ten=1
null=0
for i in $(seq 1 12)
do
	for y in $(seq 1 9)
	do
            ten="$ten,${routeNumbers[$index]}"
	    index=$((index+1))
	done
	
	store=`curl "http://www.ctabustracker.com/bustime/api/v2/getvehicles?key=Ph2VjWCh3hRRKyqERyPYdYLjs&rt=$ten&format=json"`
	length=`echo $store | jq '."bustime-response".vehicle | length'`
	declare -a array=()
	declare string=
	for y in $(seq 0 $length)
	do
	    vid=`echo $store | jq '."bustime-response".vehicle['$y'].vid'` 
	    rt=`echo $store | jq '."bustime-response".vehicle['$y'].rt'`
	    dly=`echo $store | jq '."bustime-response".vehicle['$y'].dly'`
	    tmstmp=`echo $store | jq '."bustime-response".vehicle['$y'].tmstmp'`	
	    #echo $tmstmp
	    if [[ $vid != "null" ]]
	    then
		array+="($null,$vid,$rt,$dly,$tmstmp),"
	    fi
    	done
	#for value in "${array[@]}"
	#do 
	#    string+=$value
	#    echo $value
	#    echo hello
	#done
	#for value in "${string[@]}"
        #do
	#     echo $value
	#done
	array=`echo $array | sed 's/.$//'`
	echo $array	
	mysql -h buses-instance-1.cfai3nm0tmno.us-east-1.rds.amazonaws.com -P 3306 -u admin -p"password" -D"buses" -e "insert into status(ID,busID,late,time,route) values $array"
	#echo $string
	#mongo --eval "db.project.insertMany([$string])"
	#echo $array"checking if arrays want to fucking work"
	declare ten=${routeNumbers[$index]}
	index=$((index+1))
done
