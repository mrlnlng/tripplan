import requests
import json
import bs4
import datetime
import re


def create_url(location):
    url = f"https://www.airbnb.ca/s/{location}/homes?tab_id=all_tab&refinement_paths%5B%5D=%2Fhomes&source=structured_search_input_header&search_type=search_query"
    return url

def scrape_airbnb(location):
    url = create_url(location)
    # print(url)
    response = requests.request("GET", url)
    soup = bs4.BeautifulSoup(response.text, 'html.parser')

    information_list = []
    names_list = []
    image_urls_list = []
    ratings_list = []
    reviews_list = []

    
    for listing in soup.findAll("div",{"itemprop" : "itemListElement"}):
        string = listing.text.replace("SUPERHOST", "")
        listing_html = listing.prettify()
        title = re.findall(r"content=\"(.+) - null", listing_html)
        name = title[0]
        # print(name)
        # name = title[0]
        
        rating_regex = re.findall(r"Rating ([0-9]\.([0-9]+)) out of 5", listing_html)
        if len(rating_regex) ==  0:
            rating = None
        else:
            rating = rating_regex[0][0]
        # print(rating)

        images = listing.find_all("img")
        image_urls_list = [image.get("src") for image in images]
        image_url = image_urls_list[0]
        
        reviews_regex = re.findall(r"((\d)+) reviews", listing_html)
        if len(reviews_regex) == 0:
            reviews = "0"
        else:
            reviews = reviews_regex[0][0]

        listing_dict = dict(rating=rating,image_url=image_url,name=name,review_count=reviews)
        information_list.append(listing_dict)

    # print(information_list)
    return information_list




# scrape_airbnb("montreal")