#!/usr/bin/env python3
import json
from os import environ
import cgi
import cgitb; cgitb.enable()
form = cgi.FieldStorage()    #pobiera wszystkie informacje wyslane za pomoca formularza
print ("Content-Type: text/plain\n\n")

if environ['REQUEST_METHOD'] == "GET":
  with open("./ksiazki.json", 'r') as file:
    data = json.load(file)
    data = json.dumps(data, separators=(',', ':'))
    print(data)
elif environ['REQUEST_METHOD'] == "POST":
  autor = form.getvalue("autor", "") 
  tytul = form.getvalue("tytul", "") 
  with open("./ksiazki.json", 'r+') as file:
    data = json.load(file)
    newData = {"autor": autor, "tytul": tytul}
    data["ksiazki"].append(newData)
    file.seek(0)
    json.dump(data, file, indent=2)
    print("added")

