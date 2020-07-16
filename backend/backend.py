from flask import Flask
from flask import request
from flask_cors import CORS
import json
from restaurant import scrape_restaurant
from airbnb import scrape_airbnb
from places import scrape_trip_advisor


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
    return json.dumps(scrape_trip_advisor(location))

app.run()