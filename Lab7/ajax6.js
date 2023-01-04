function sendRequest() {
  var myDiv = document.getElementById("MyDivElement");
  var url = "../cgi-bin/ajax_json.py";
  var txt = '';
  var info = '';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let html = "";
      for (let i = 0; i < data.students.length; i++)
        html += data.students[i].fname + " " + data.students[i].lname + "\n";
      myDiv.innerHTML += html;

      //for (let [key, value] of response.headers) {
      //  txt += `${key} = ${value} <br>`;
      //  // console.log(`${key} = ${value} <br>`);             
      //} 
      // myDiv.innerHTML += txt;
    })
    .catch(error => console.log("Błąd: ", error));
}