#!/usr/bin/env python
import cgi
import os
from datetime import datetime

form = cgi.FieldStorage()

autor = form.getvalue("autor")
tytul = form.getvalue("tytul")

if tytul and autor:
  date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
  with open("../Lab5/db/ksiazka.dat", 'a') as file:
    file.write(tytul + ";" + autor + ";" + date + ";" + os.environ["REMOTE_ADDR"] + ";\n")


print ("Content-type: text/html")
print ("") 
print ("<!DOCTYPE html>")
print ("<html><head>")
print ("<title>Rekordy</title>")
print ("<link href=\"../Lab5/style.css\" rel=\"stylesheet\" type=\"text/css\" />")
print ("</head><body><div class=\"result\">")

print ("<h3>REKORDY W BAZIE DANYCH</h3>")

print ("<table border='1'>")
print ("<thead>")
print ("<tr><th>autor</th><th>tytul</th><th>IP</th><th>date</th></tr>")
print ("</thead>")

with open("../Lab5/db/ksiazka.dat", 'r') as file:
  line = file.readline()
  while line != '':
    el = line.split(';')
    print ("<tr>")
    print ("<td>" + el[1] + "</td>")
    print ("<td>" + el[0] + "</td>")
    print ("<td>" + el[3] + "</td>")
    print ("<td>" + el[2] + "</td>")
    print ("</tr>")
    line = file.readline()

print ("</table>")

print ("</div></body></html>")