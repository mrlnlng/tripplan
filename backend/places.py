import json
import requests_html
import re
import bs4
import asyncio
import html
import time
from tqdm import tqdm

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
     
def handle_link_with_retries(url, retries = 3):
    resp = session.get(url)
   
    while retries > 0:
        try:
            resp = session.get(url)
            print("returning resp")
            return resp
        except Exception as e:
            print(f"Error with {url} : {e}")
            retries -= 1

def scrape_google(location):
    print("Running partial_info_list")
    locationID = create_url(location)
    url = f"https://www.google.com/travel/things-to-do/see-all?dest_mid={locationID}"
    resp = handle_link_with_retries(url)
    soup = bs4.BeautifulSoup(resp.text, 'html.parser')
    partial_information_list = []
    names_set = set()
    for element in soup.findAll("div", {"role" : "listitem"}):
        string = element.text
        name_list = re.findall(r"data-title=\"(.*?)\"", str(element))
        if len(name_list) != 0 and name_list[0] not in names_set:
            name = html.unescape(name_list[0])
            names_set.add(name_list[0])
            url_place = f"https://www.google.com/search?q={name} {location}" 
        else:
            continue

        # element_html = element.prettify()
        image_list = re.findall(r"src=\"(.*?)\"", str(element))
        if len(image_list) != 0:
            image_url = image_list[0]
        else:
            image_url = None
        
        rating_list = re.findall(r"(\d.\d)", string)
        # print(rating_list)
        if len(rating_list) != 0:
            possible_rating = [element for element in rating_list if "." in element]
            if len(possible_rating) != 0 and float(possible_rating[0]) < 5:
                rating = possible_rating[0]
        else:
            rating = None

        review_list = re.findall(r"\(([\d|,]+)\)", string)
        if len(review_list) != 0:  
            reviews = review_list[0]
        else:
            reviews = None


        element_dict = dict(rating=rating,image_url=image_url,name=name,review_count=reviews, url_place=url_place)
        partial_information_list.append(element_dict)

    return partial_information_list
    

# async def fetch_all(urls,retries=3):
#     asession = requests_html.AsyncHTMLSession()
#     resps = await asyncio.gather(*(asession.get(url) for url in urls))
#     return resps
    


# async def scrape_google(location):
    # print("started scraping google")
    # names_set, partial_information_list = partial_info_list(location)
    # urls = [f"https://www.google.com/search?q={name}" for name in tqdm(names_set)]

    
    # for (url, info_dict) in tqdm(list(zip(urls, partial_information_list))):
    #     info_dict["url_place"] = url
    # #         # print(info_dict)
   
    # # print(partial_information_list)
    # # print("finished scraping gogoele")
    # return (partial_information_list)

# import cProfile
# scrape_google("newyork")
# asyncio.run(find_link("california's great america"))

