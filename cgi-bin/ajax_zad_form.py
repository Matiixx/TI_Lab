#!/usr/bin/python3
from os import environ
import cgi
import cgitb; cgitb.enable()
form = cgi.FieldStorage()    #pobiera wszystkie informacje wyslane za pomoca formularza
opcja = form.getvalue("opcja", "0")  

print ("Content-Type: application/xml\n\n")

if opcja == "1":
  with open("./opcja1.xml", 'r') as file:
    data = file.read()
    print(data)
elif opcja == "2": 
  with open("./opcja2.xml", 'r') as file:
    data = file.read()
    print(data)
else: 
  print ("""
  <!--?xml version=\"1.0\" ?-->
  <options>
  </options>
  """)
