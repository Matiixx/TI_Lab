const showRecordsBtn = document.getElementById("showRecordsBtn");
const addRecordBtn = document.getElementById("addRecordBtn");
const sendRecordBtn = document.getElementById("sendRecord");
const resTable = document.getElementById("res-table");

showRecordsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (document.getElementsByClassName("list")[0].classList.contains("disable")) {
    sendRequest();
    document.getElementsByClassName("list")[0].classList.remove("disable");
    document.getElementsByClassName("form")[0].classList.add("disable");
  }
})

addRecordBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementsByClassName("list")[0].classList.add("disable");
  document.getElementsByClassName("form")[0].classList.remove("disable");
})

sendRecordBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const form1 = document.form1;
  const autor = form1.autor.value;
  const tytul = form1.tytul.value;
  if (autor && tytul)
    sendRecord(autor, tytul);

})

function sendRequest() {
  var url = "../cgi-bin/ajax_zadanie.py";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      resTable.innerHTML = "<tr><th>tytul</th><th>autor</th></tr>";
      for (let el of data.ksiazki) {
        let tr = document.createElement("TR")
        let autor = el.autor.trim();
        let tytul = el.tytul.trim();
        let tdAutor = document.createElement("TD");
        let tdTytul = document.createElement("TD");
        tdAutor.appendChild(document.createTextNode(autor));
        tdTytul.appendChild(document.createTextNode(tytul));
        tr.appendChild(tdTytul);
        tr.appendChild(tdAutor);
        resTable.appendChild(tr);
      }

    }).catch(e => console.log(e))
}

function sendRecord(autor = "", tytul = "") {
  var url = "../cgi-bin/ajax_zadanie.py";
  let data = encodeURI("autor=" + autor + "&tytul=" + tytul)

  const headers = new Headers();
  headers.append("Content-type", "application/x-www-form-urlencoded");

  fetch(url, {
    method: "post",
    headers,
    body: data
  })
    .then(res => res.text())
    .then(data => {
      console.log(data.trim());
      if (data.trim() === "added") {
        document.getElementById("result-text").textContent = "Dodawno";
        document.form1.autor.value = "";
        document.form1.tytul.value = "";
      }
    })
    .catch(e => console.log(e))
}