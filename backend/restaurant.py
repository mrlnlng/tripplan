import requests
import json
from flask import request

def scrape_restaurant(location):
    base_url = "https://api.yelp.com/v3/businesses/search?limit=50&term=food&sort_by=review_count&"
    headers = {
    'Authorization': 'Bearer yqbCUnlpU7Klu0cLgm3yFqvHkZSpd0TI7Zz7fcx5PpiUZpmGL7dPmuJzRz8Nus64XkQQkKVQYHM9WmaLKHX54HndkT2lCRPInf4oUx-lJ1vq6tqALLzHrBPs25b7XnYx'
    }
    # query = request.full_path.split("?")[-1]
    url = f"{base_url}{location}"
    response = requests.request("GET", url, headers=headers)
    businesses = response.json()["businesses"]
    businesses_info = []
    for business in businesses:
        restaurant_info = dict()
        restaurant_info = {"image_url": business["image_url"], "name": business["name"], "rating": business["rating"], "price": business["price"], "review_count": business["review_count"]}
        businesses_info.append(restaurant_info)
    
    return businesses_info