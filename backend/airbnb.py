import requests
import json
import bs4
import re


def create_url(location):
    url = f"https://www.airbnb.ca/s/{location}/homes?tab_id=all_tab&refinement_paths%5B%5D=%2Fhomes&source=structured_search_input_header&search_type=search_query"
    return url

def scrape_airbnb(location):
    url = create_url(location)
    response = requests.request("GET", url)
    soup = bs4.BeautifulSoup(response.text, 'html.parser')

    information_list = []
    
    for listing in soup.findAll("div",{"itemprop" : "itemListElement"}):
        string = listing.text.replace("SUPERHOST", "")
        listing_html = listing.prettify()
       
        link_element = listing.a   
        link_path = link_element.get('href')
        link = f"https://www.airbnb.com{link_path}"
        title = re.findall(r"content=\"(.+) - null", listing_html)
        # print(title)
        if len(title) != 0:
            name = title[0]
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

            listing_dict = dict(rating=rating,image_url=image_url,name=name,review_count=reviews, link=link)
            information_list.append(listing_dict)
        else:
            continue

    # print(information_list)
    return information_list




scrape_airbnb("San Francisco")