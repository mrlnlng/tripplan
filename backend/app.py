from flask import Flask
from flask import request
from flask_cors import CORS
import json
from restaurant import scrape_restaurant
from airbnb import scrape_airbnb
from places import scrape_google
# from places_link import find_link
# import asyncio


app = Flask(__name__)
CORS(app)


@app.route('/restaurants')
def handle_restaurants():
    location = request.full_path.split("?")[-1]
    businesses_info = scrape_restaurant(location)
    return json.dumps(businesses_info)

@app.route('/hotels')
def handle_airbnb():
    location = request.full_path.split("=")[-1]
    
    
    # businesses_info = scrape_restaurant()
    # return json.dumps(businesses_info)
    return json.dumps(scrape_airbnb(location))

@app.route('/places')
def handle_places():
    location = request.full_path.split("=")[-1]
    resp = scrape_google(location)
    # print(resp)
    return json.dumps(resp)
# @app.route('/places/link')
#     return 

# @app.route('/places/google')
# def handle_google():
#     url = request.full_path.split("=")[-1]
#     # print()
#     link = find_link(url)
#     return json.dumps(link)

@app.route('/')
def handle_main():
    return "Welcome to the API"

if __name__ == "__main__":
    app.run(threaded=False,port=5000)
