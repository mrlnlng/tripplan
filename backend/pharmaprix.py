from requests_html import HTMLSession
import re
import pandas as pd
from tqdm import tqdm


session = HTMLSession()

r = session.get("https://stores.pharmaprix.ca/en/listing/")
link_list = list(r.html.links)
information_list = []

for link in tqdm(link_list):
    if link.startswith('https://stores.pharmaprix.ca/en/store/') or link.startswith('https://stores.shoppersdrugmart.ca/en/store/'):
        resp = session.get(link)
        store_email_list = resp.html.find('.store-details__email')
        if len(store_email_list) != 0:
            store_email = store_email_list[0].text
        else: 
            store_email = "No email found"

        owner_list = resp.html.find('.pharmacist-name')
        if len(owner_list) != 0:
            owner = owner_list[0].text
        else:
            owner = "No owner found"

        phone_number_list = resp.html.find('.phone')
        if len(phone_number_list) != 0:
            phone_number = phone_number_list[0].text
        else:
            phone_number = "No phone number found"

        address_list = resp.html.find('.store-details__address')
        if len(address_list) != 0: 
            address = address_list[0].text
            city = re.findall(r"\n(.*),", address)[0]
            postal_code = address[-7:]
            province = re.findall(r", ([A-Z]*)", address)[-1]
            proper_address = address.replace('\n', ' ')

        else:
            proper_address = "No address found"
        
        store_info = dict(owner = owner, store_email = store_email, phone_number = phone_number, address = proper_address, city = city, postal_code = postal_code, province = province)
        # print(store_info)
        information_list.append(store_info)
        

# print(information_list)
pd.DataFrame(information_list).to_excel("output.xlsx")