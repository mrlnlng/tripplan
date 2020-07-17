import json
import requests_html
import re
import bs4

session = requests_html.HTMLSession()
session.browser

def create_url(location):
    url = f"https://www.google.com/search?q={location}+places"
    resp = session.get(url)
    links = resp.html.links
    for link in links:
        location_link = re.findall(r"(\/m\/.*?)&", link)
        if len(location_link) != 0:
            locationID = location_link[0]
            return locationID

def scrape_google(location):
    locationID = create_url(location)
    url = f"https://www.google.com/travel/things-to-do/see-all?dest_mid={locationID}"
    resp = session.get(url)
    soup = bs4.BeautifulSoup(resp.text, 'html.parser')
    information_list = []
    names_set = set()
    for element in soup.findAll("div", {"role" : "listitem"}):
      
        string = element.text
        name_list = re.findall(r"([\w|\D]+?)\d", string)
        if len(name_list) != 0 and name_list[0] not in names_set:
            name = name_list[0]
            names_set.add(name)
        else:
            continue

        element_html = element.prettify()
        image_list = re.findall(r"src=\"(.*?)\"", element.prettify())
        if len(image_list) != 0:
            image_url = image_list[0]
        else:
            image_url = None
        
        rating_list = re.findall(r"(\d.\d)", string)
        if len(rating_list) != 0 and float(rating_list[0]) < 5:
            rating = rating_list[0]
        else:
            rating = None

        review_list = re.findall(r"\(([\d|,]+)\)", string)
        if len(review_list) != 0:  
            reviews = review_list[0]
        else:
            reviews = None

        element_dict = dict(rating=rating,image_url=image_url,name=name,review_count=reviews)
        information_list.append(element_dict)
    
    print(information_list)
    
    
    return information_list

scrape_google("montreal")
