#!/usr/bin/env python3
import json
# print ("Content-Type: appliaction/json\n\n")
print ("Content-Type: text/plain\n\n")

with open("./file.json", 'r') as file:
  data = json.load(file)
  data = json.dumps(data, separators=(',', ':'))
  print(data)


# print ("""
# {"students" : [
# {"fname":"Adam", "lname":"Abacki"},
# {"fname":"Bogdan", "lname":"Babacki"}
# ]}
# """)