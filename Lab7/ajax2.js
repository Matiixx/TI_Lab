var xmlHttp;
function getRequestObject() {
  if (window.ActiveXObject) {
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } else if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } else {
    return (null);
  }
}

function sendRequest() {
  xmlHttp = getRequestObject();
  if (xmlHttp) {
    try {
      xmlHttp.onreadystatechange = handleResponse;
      xmlHttp.open("GET", "../cgi-bin/ajax_hello.py", true);
      xmlHttp.send(null);
    }
    catch (e) {
      alert("Nie mozna polaczyc sie z serwerem: " + e.toString());
    }
  } else {
    alert("Blad");
  }
}

function handleResponse() {
  myDiv = document.getElementById("MyDivElement");
  if (xmlHttp.readyState == 1) {
    myDiv.innerHTML += "Status zadania: 1 (laduje)<br/>";
  }
  else if (xmlHttp.readyState == 2) {
    myDiv.innerHTML += "Status zadania: 2 (zaladowany)<br/>";
  }
  else if (xmlHttp.readyState == 3) {
    myDiv.innerHTML += "Status zadania: 3 (interaktywny)<br/>";
  }
  else if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200) {
      response = xmlHttp.responseText;
      myDiv.innerHTML += "Status zadania: 4(zakonczony)<br/>";
      myDiv.innerHTML += response;
    }
  }
}