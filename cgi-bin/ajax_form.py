#!/usr/bin/python3
from os import environ
import cgi
import cgitb; cgitb.enable()
form = cgi.FieldStorage()    #pobiera wszystkie informacje wyslane za pomoca formularza
info = form.getvalue("info", "(no info)")   

print ("Content-Type: text/plain\n\n")
print (f"""
<p>Env:</p>
<table >
<tr><td>REQUEST_METHOD: </td><td>{environ['REQUEST_METHOD']}</td></tr>
<tr><td>QUERY_STRING: </td><td>{environ['QUERY_STRING']}</td></tr>
</table>
<p>Wartosc zmiennej 'info': {info}</p>
""" )