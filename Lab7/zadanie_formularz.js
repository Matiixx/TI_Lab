const btn1 = document.getElementById('opcja1')
const btn2 = document.getElementById('opcja2')
const resDiv = document.getElementById("result-div")

btn1.addEventListener("click", (e) => {
  e.preventDefault();
  sendRequest(1)
})

btn2.addEventListener("click", (e) => {
  e.preventDefault();
  sendRequest(2)
})

function sendRequest(opcja) {
  var url = "../cgi-bin/ajax_zad_form.py";
  url += "?opcja=" + opcja;

  fetch(url)
    .then(res => res.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      resDiv.innerHTML = "";
      let options = data.documentElement.children;

      let select = document.createElement("SELECT");

      for (let el of options) {
        let opt = document.createElement("OPTION")
        let text = el.textContent.trim();
        opt.setAttribute("value", text);
        opt.appendChild(document.createTextNode(text));
        select.appendChild(opt);
      }
      resDiv.appendChild(select);
    }).catch(e => console.log(e))
}