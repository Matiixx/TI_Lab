#!/usr/bin/env python
import cgi
import os
from datetime import datetime
form = cgi.FieldStorage()
  
tytul = form.getvalue("tytul")
autor = form.getvalue("autor")

date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

with open("ksiazka.dat", 'a') as file:
  file.write(tytul + ";" + autor + ";" + date + ";" + os.environ["REMOTE_ADDR"] + ";\n")

print ("Content-type: text/html")
print ("") 
print ("<!DOCTYPE html>")
print ("<html><head>")
print ("<link href=\"../Lab5/ksiazka.css\" rel=\"stylesheet\" type=\"text/css\" />")
print ("<title>Ksiazka response</title>")
print ("</head><body>")

with open("ksiazka.dat", "r") as file:
  line = file.readline()
  print ("<table><thead><tr><th>autor</th><th>tytul</th><th>date</th><th>IP</th></tr></thead>")
  while line != '':
    print ("<tr>")
    for p in line.split(';'):
      print ("<td>" + p + "</td>")
    print ("</tr>")
    line = file.readline()
  print ("</table>")
  


print ("</body></html>")
