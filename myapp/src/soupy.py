
import mysql.connector
#This will not run on online IDE
import json

import requests
from bs4 import BeautifulSoup
  
response = requests.get("http://www.ctabustracker.com/bustime/api/v2/getroutes?key=Ph2VjWCh3hRRKyqERyPYdYLjs&format=json")
busNames = (response.json()["bustime-response"]["routes"])

mydb = mysql.connector.connect(
        host="timelinessofctabuses9008.cfai3nm0tmno.us-east-1.rds.amazonaws.com",
        user="nergigante5678",
        port=3306,
        password="2*sPq*EFf6MH7qUZxt2z",
        database="CTA"
    )
mycursor = mydb.cursor()

with open("text.txt","r") as f:
    counter = 0
    for line in f:
        store = line.strip()
        line = line.strip() + "/"
        URL = "https://www.transitchicago.com/bus/"+line
        r = requests.get(URL)
        soup = BeautifulSoup(r.content, 'html5lib') 

        name = 0
        for div in soup.findAll('div', {'class': 'pageHeading'}):
            # print(div)
            if(div.h1.span is None):
                name = div.h1.text
                name = name.strip()
            else:
                name = div.h1.span.decode_contents()
            print(name)
            name = name.replace("&amp;","&")

        for div in soup.findAll('div', {'class': 'interior-main-banner'}):
           
            # if(str(store) is not str(busNames[counter]["rt"])):
            #      print(store + "d",(busNames[counter]["rt"]) + "d")
            sql = "INSERT INTO Image VALUES (0,%s, %s,%s)"
            image = div.img.get("src")
            if image is None:
                image = "/assets/1/6/routeheader_bus001.jpg?15140"
            val = (image,store,name)
            # counter+=1
            mycursor.execute(sql, val)
            mydb.commit()
        
            # val = (div.img.get("span"), store)
            # mycursor.execute(sql, val)
            # mydb.commit()
           