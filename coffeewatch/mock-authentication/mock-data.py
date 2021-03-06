from faker import Faker
import json
import random
import io
import math
import datetime

fakegr= Faker('el_GR')
fakeen= Faker()

TOTAL_REVIEWS=10000
TOTAL_COFFEES=1000
TOTAL_COFFEESHOPS=50
TOTAL_USERS=10
PRICES_PER_PRODUCT = 15

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

def daterange(n):
    dates = [fakegr.date_between_dates(datetime.date(2018,1,1), datetime.date(2019,3,3)) for i in range(0,n)]
    dates.sort()
    return dates


def priceGen(n,base,delta=0.4):
    prices = []
    for i in range(0,n):
        base = base + random.uniform(-delta,delta)
        prices.append(abs(round(base,2)))
    return prices

users=[]
usernames={}
for i in range(1,TOTAL_USERS+1):
    username=fakegr.name()
    usernames[i]=username
    users.append({"id":i,"name":username,"email":("user"+str(i)+"@email.com"),"password":"27168b830c30987f0a7bb4763ca22b74da1079f7a66a296e6dce66e195f8886c"})
users.append({"id": TOTAL_USERS+1,"name":"guruOfNet","email":"guru@of.net","password":"1c0b5351c99d1aeb075465e2102ff64b4bc421138045268edd727b593acd6584"})
users={"users":users}
user_db=[{"email":user["email"],"id":user["id"]} for user in users["users"]]
user_db={"users":user_db}

with io.open("users.json","w+",encoding='utf-8') as f:
    f.write(json.dumps(users,ensure_ascii=False))



coffees=['Espresso','Freddo espresso','Cappuccino','Freddo cappuccino', 'Latte', 'Nes', 'Frappe', 'Φίλτρου', 'Ελληνικός']



shops=[]
csnames=["Mikel","CoffeeBrands","Coffee Island","Bruno","CoffeeLand","CoffeeBreak","Delicious","Τηλεσκόπιο","Φραπεδιερα","Εξαντας","Σπείρα","Mirrors"]
shopnames={}
for i in range(1,TOTAL_COFFEESHOPS + 1):
    coords=geogen(37.982038,23.730271,random.randint(500,10000))
    coffeeidgen=no_repeat(random.randint)
    name = random.choice(csnames)
    shopnames[i] = name
    shops.append({
        "withdrawn":"false",
        "name": name,
        "address": fakegr.street_address(),
        "website":fakegr.uri(),
        "telephone":fakegr.phone_number(),
        "iconPath":"../assets/images/coffeeshops/{}.png".format(random.randint(0,7)),
        "lng":coords[1],
        "lat":coords[0],
        tags:[]

    })


products=[]
prices=[]
price_counter = 0
for i in range(1,TOTAL_COFFEES + 1):
    numOfReviews=random.randint(1,100)
    reviewidgen=no_repeat(random.randint)
    name=random.choice(coffees)
    shopid = random.randint(1,TOTAL_COFFEESHOPS)
    dates = daterange(PRICES_PER_PRODUCT)
    rand_prices = priceGen(len(dates),random.randint(1,5))
    products.append({
        "withdrawn":"false",
        "name": name,
        "category":name,
        "shopid": shopid,
        "description": fakegr.text(random.randint(50,1000)),
        "tags": []
    })
    for date,price in zip(dates,rand_prices):
        prices.append({
            "id": price_counter,
            "date": date.strftime('%Y-%m-%d'),
            "price": abs(price),
            "shopId": str(shopid),
            "shopName": shopnames[shopid],
            "productName": name,
            "productId": str(i), 

        })
        price_counter += 1
    


reviews=[]
for i in range(1,TOTAL_REVIEWS):
    #id,text,rating,userid,username,date,numoflikes,numofdislikes
    userid=random.randint(1,10)
    username= usernames[userid]
    reviews.append(
        {
            "id": i,
            "text": fakegr.text(random.randint(11,500)),
            "rating": random.randint(1, 5),
            "userid":userid,
            "username": username,
            "date": datetime.datetime.strptime(fakegr.date(), "%Y-%m-%d").strftime("%d/%m/%Y"),
            "numOfLikes":random.randint(0,100),
            "numOfDislikes": random.randint(0,100),
            "coffeeId": random.randint(1, TOTAL_COFFEES),
        }
    )





products={"products": products}
shops={"shops": shops}
reviews={"reviews": reviews}
prices = {"prices" : prices}

final_dict={**products,**shops,**reviews,**user_db,**prices}


with io.open("./api.json","w+",encoding="utf-8") as apidb:
    apidb.write(json.dumps(final_dict,ensure_ascii=False))
