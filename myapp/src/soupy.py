
#This will not run on online IDE
import requests
from bs4 import BeautifulSoup

    
with open("text.txt","r") as f:
    for line in f:
        line = line.strip() + "/"
        URL = "https://www.transitchicago.com/bus/"+line
        r = requests.get(URL)
        soup = BeautifulSoup(r.content, 'html5lib') # If this line causes an error, run 'pip install html5lib' or install html5lib
        # print(soup)
        for div in soup.findAll('div', {'class': 'interior-main-banner'}):
            print(div.img.get("src"))
            print(line)
