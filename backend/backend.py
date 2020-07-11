from flask import Flask
from flask import request
from flask_cors import CORS
import json
from restaurant import scrape_restaurant
from airbnb import scrape_airbnb

app = Flask(__name__)
CORS(app)

@app.route('/restaurants')
def handle_restaurants():
    location = request.full_path.split("?")[-1]
    businesses_info = scrape_restaurant(location)
    return json.dumps(businesses_info)

@app.route('/hotels')
def handle_airbnb():
    # businesses_info = scrape_restaurant()
    # return json.dumps(businesses_info)
    query = "new york"
    return json.dumps(scrape_airbnb(query))
app.run()


