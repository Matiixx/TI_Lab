function sendRequest() {
  var myDiv = document.getElementById("MyDivElement");
  var info = document.getElementById('info').value;
  var url = "../cgi-bin/ajax_form.py";
  var data = encodeURI("info=" + info);
  console.log(data);
  var txt = '';
  var info = '';
  const headers = new Headers();
  headers.append("Content-type", "application/x-www-form-urlencoded");
  fetch(url, { method: "post", headers: headers, body: data })
    .then(response =>
      response.text())
    .then(data => {
      info = data;
      console.log(data);
      myDiv.innerHTML += info;

      //for (let [key, value] of response.headers) {
      //  txt += `${key} = ${value} <br>`;
      //  // console.log(`${key} = ${value} <br>`);             
      //} 
      myDiv.innerHTML += txt;
    })
    .catch(error => console.log("Błąd: ", error));
}