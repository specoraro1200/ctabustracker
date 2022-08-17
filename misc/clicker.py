import selenium
from selenium import webdriver as wb

import time
from time import sleep
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

driver = wb.Chrome("C:/Users/scpec/Downloads/chromedriver.exe")
driver.get("https://www.naukri.com")