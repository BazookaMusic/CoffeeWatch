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
usernames={}
for i in range(1,11):
    username=fakegr.name()
    usernames[i]=username
    users.append({"id":i,"name":username,"email":("user"+str(i)+"@email.com"),"password":"27168b830c30987f0a7bb4763ca22b74da1079f7a66a296e6dce66e195f8886c"})
users={"users":users}
user_db=[{"email":user["email"],"id":user["id"]} for user in users["users"]]
user_db={"users":user_db}

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
        "shopid":random.randint(1,TOTAL_COFFEESHOPS),
        "description": fakegr.text(random.randint(50,1000)),
        "price": str(round(random.uniform(1.0,5.0),2)),
        "extraData":{
        "rating": str(round(random.uniform(0.0,5.0),2)),
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
        "website":fakegr.uri(),
        "telephone":fakegr.phone_number(),
        "iconPath":"./assets/mikel.png",
        "lng":coords[1],
        "lat":coords[0],
    })

reviews=[]
for i in range(1,TOTAL_REVIEWS):
    #id,text,rating,userid,username,date,numoflikes,numofdislikes
    userid=random.randint(1,10)
    username= usernames[userid]
    reviews.append(
        {
            "id": i,
            "text": fakegr.text(random.randint(11,500)),
            "userid":userid,
            "username": username,
            "date": fakegr.date(),
            "numOfLikes":random.randint(0,100),
            "numOfDislikes":random.randint(0,100)
        }
    )

products={"products":products}
shops={"shops":shops}
reviews={"reviews":reviews}

final_dict={**products,**shops,**reviews,**user_db}


with io.open("../src/api.json","w",encoding="utf-8") as apidb:
    apidb.write(json.dumps(final_dict,ensure_ascii=False))






    