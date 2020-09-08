import json
import re
import bs4
import requests_html
import urllib.parse
import requests

session = requests_html.HTMLSession()

def handle_link_with_retries(url, retries=3):
    decoded_url = urllib.parse.unquote(url)
    # print(decoded_url)
    while retries > 0:
        try:
            resp = requests.get(str(decoded_url))
            return resp
        except Exception as e:
            print(f"Error with {decoded_url} : {e}")
            retries -= 1


def find_link(url):
    # print("started fetching")
    # start = time.time()kk
    # resps = await fetch_all(urls)
    # end = time.time()
    # print(f'finished fetching time={end-start}')
    # links = []
    # print("Found all links")
    resp = handle_link_with_retries(url)
    link_element = resp.html.find('a', containing="Website", first=True)

    print(link_element)
    if link_element != None:
        link_list = []
        # print(link_element.attrs['href'])
        link_list.append(link_element.attrs["href"])
        return link_list
    else:
        return None


# find_link("https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3DLa%20Ronde")
