import pandas as pd
import csv
import random
crops=["Barley","Bluegrass","Corn","Cotton","Fescue","Grain Sorghum","Peanuts","Rice","Soybeans","Watermelon","Wheat"]
with open("data.csv",mode='w') as datafile:
    fieldnames = ['Na', 'K', 'Ca','Mg','Ph','Moisture','Cost','Demand','Crop']
    writer = csv.DictWriter(datafile, fieldnames=fieldnames)

    writer.writeheader()
    for i in range(500):
        writer.writerow({'Na':random.randint(10,40),'K':random.randint(120,150),'Ca':random.randint(30,40),'Mg':random.randint(25,50),'Ph':random.randint(4,6),'Moisture':random.randint(10,30),'Cost':random.randint(2500,5000),'Demand':random.randint(1,5),'Crop':crops[random.randint(0,10)]})