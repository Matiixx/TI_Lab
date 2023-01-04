function sendRequest() {
  var myDiv = document.getElementById("MyDivElement");
  var info = document.getElementById('info').value;
  var url = "../cgi-bin/ajax_form.py";
  url += "?info=" + info;
  var txt = '';
  var info = '';
  fetch(url)
    .then(response => {
      // for (let [key, value] of response.headers) {
      //   console.log(`${key} = ${value} <br>`);
      // }
      return response.text()
    })
    .then(data => {
      console.log(data);
      myDiv.innerHTML += data;
    })
    .catch(error => console.log("Błąd: ", error));
}
