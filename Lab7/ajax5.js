function sendRequest() {
  const xhr = new XMLHttpRequest();
  var myDiv = document.getElementById("MyDivElement");
  var url = "../cgi-bin/ajax_xml.py";
  xhr.open("GET", url, true);
  xhr.addEventListener("load", e => {
    if (xhr.status == 200) {
      response = xhr.responseXML;
      console.log(response);
      myDiv.innerHTML += response + "<br>";
      var xmlRoot = response.documentElement;
      var fnameArray = xmlRoot.getElementsByTagName('fname');
      console.log(fnameArray);
      var lnameArray = xmlRoot.getElementsByTagName('lname');
      var html = "";
      for (var i = 0; i < fnameArray.length; i++) {
        // console.log(fnameArray.item(i));
        html += fnameArray.item(i).firstChild.data + " "
          + lnameArray.item(i).firstChild.data + "\n";
        console.log(html);
      }
      myDiv.innerText += html;
    }
  })
  xhr.addEventListener("progress", e => {
    myDiv.innerHTML += "Status zadania: " + xhr.readyState + " (progress) <br>";
  });

  xhr.addEventListener("error", e => {
    alert("Nie udało się nawiązać połączenia");
  });

  xhr.send();
}
