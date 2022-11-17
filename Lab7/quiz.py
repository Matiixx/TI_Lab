#!/usr/bin/env python3
import json
from os import environ
import cgi
import cgitb; cgitb.enable()
form = cgi.FieldStorage() 
print ("Content-Type: text/plain\n\n")

if environ['REQUEST_METHOD'] == "POST":
    pora_roku = form.getvalue("pora_roku", "")
    if pora_roku:
        with open("../Lab7/quiz.json", 'r') as file:
            data = json.load(file)
        data["odpowiedzi"][pora_roku] += 1
        with open("../Lab7/quiz.json", 'w') as file:
            json.dump(data, file, indent=3)
        data = json.dumps(data, separators=(',', ':'))
        print(data)
