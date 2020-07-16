import json
import requests_html
import re
import bs4

session = requests_html.HTMLSession()
session.browser

def getID(location):
    resp = session.get(f"https://www.tripadvisor.ca/Search?q={location}")
    resp.html.render(sleep=5,retries=1)
    links = (list(resp.html.links))
    for link in links:
        string = str(link)
        location = re.findall(r"-g(\d+)-", string)
        if len(location) != 0:
            locationId = location[0]
            return locationId
    

def scrape_trip_advisor(location):
    location_id = getID(location)
    resp = session.get(f"https://www.tripadvisor.ca/Attractions-g{location_id}-Activities-a_allAttractions.true")
    soup = bs4.BeautifulSoup(resp.text, 'html.parser')
    listing_html = soup.prettify()
    elements = re.findall(r"\"location\":{\"name\":(.*?)\"minPriceInfo\"", listing_html)
    attractions_list = []
    for element in elements:
        name = re.findall(r"\"name\":\"(.*?)\"", element)[0]
        reviews = re.findall(r"\"reviewCount\":(\d+)", element)[0]
        image_url = re.findall(r"\"url\":\"(h.*?)\"},{\"", element)[-1]
        rating = re.findall(r"\"reviewScore\":(\d+)", element)[0]
        element_dict = dict(rating=rating,image_url=image_url,name=name,review_count=reviews)
        attractions_list.append(element_dict)

    return attractions_list


# scrape_trip_advisor("Montreal")