# request from ok enpoint
import requests
import json

url = "http://127.0.0.1:5000"

response = requests.get(url + "/ok")

print(response.json())
