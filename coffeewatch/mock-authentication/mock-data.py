from faker import Faker
import json
import random
import io
import math
fakegr= Faker('el_GR')
fakeen= Faker()

TOTAL_REVIEWS=10000
TOTAL_COFFEES=1000
TOTAL_COFFEESHOPS=50

def no_repeat(f):
    previous={}
    def new_f(start,end):
        value= f(start,end)
        while value in previous:
            value=f(start,end)
        previous[value]=None
        return value
    return new_f

def geogen(lat,lng,meters):
    r= meters/ 111300.0
    u=random.random()
    v=random.random()
    w=r*math.sqrt(u)
    t=2*math.pi*v
    x=w*math.cos(t)
    y1=w*math.sin(t)
    x1=x/math.cos(lat)

    return (lat+y1,lng+x1)

users=[]
for i in range(1,11):
    users.append({"id":i,"name":fakegr.name(),"email":("user"+str(i)+"@email.com"),"password":"27168b830c30987f0a7bb4763ca22b74da1079f7a66a296e6dce66e195f8886c"})
users={"users":users,"start":0,"count":11,"status":"ALL","sort":"id"}

with open("users.json","w") as f:
    f.write(json.dumps(users,ensure_ascii=False))



coffees=['Espresso','Freddo espresso','Cappuccino','Freddo cappuccino', 'Latte', 'Nes', 'Frappe', 'Φίλτρου', 'Ελληνικός']

products=[]
for i in range(1,TOTAL_COFFEES):
    numOfReviews=random.randint(1,100)
    reviewidgen=no_repeat(random.randint)
    name=random.choice(coffees)
    products.append({
        "id":i,
        "withdrawn":"false",
        "name": name,
        "category":name,
        "description": fakegr.paragraphs(random.randint(1,4)),
        "price": round(random.uniform(1.0,5.0),2),
        "extraData":{
        "rating": round(random.uniform(0.0,5.0),2),
        "numOfReviews": numOfReviews,
        "reviews":[reviewidgen(0,TOTAL_REVIEWS) for i in range(0,numOfReviews)],
        }
    })


shops=[]
csnames=["Mikel","CoffeeBrands","Coffee Island","Bruno","CoffeeLand","CoffeeBreak","Delicious","Τηλεσκόπιο","Φραπεδιερα","Εξαντας","Σπείρα","Mirrors"]
for i in range(1,TOTAL_COFFEESHOPS):
    coords=geogen(37.982038,23.730271,random.randint(500,10000))
    coffeeidgen=no_repeat(random.randint)
    shops.append({
        "id":i,
        "withdrawn":"false",
        "name": random.choice(csnames),
        "address": fakegr.street_address(),
        "iconPath":"./assets/coffeeShops/"+str(i)+".png",
        "lng":coords[1],
        "lat":coords[0],
        "extraData":{
            "coffeeid":[coffeeidgen(1,2*len(coffees))]
        }
    })


products={"products":products,"start":0,"count":TOTAL_COFFEES,"status":"ALL","sort":"id"}
shops={"shops":shops,"start":0,"count":TOTAL_COFFEESHOPS,"status":"ALL","sort":"id"}

final_dict={**products,**shops}


with io.open("api.json","w",encoding="utf-8") as apidb:
    apidb.write(json.dumps(final_dict,ensure_ascii=False))






    