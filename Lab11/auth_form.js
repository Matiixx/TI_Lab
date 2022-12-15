const form = document.querySelector('#login-form')

function setCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}

function getCookie(cookieName) {
  var cookieName = cookieName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(cookieName) === 0) res = val.substring(cookieName.length);
  })
  return res;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const login = form["user"].value;
  const pass = form['password'].value;

  console.log("submitted", login, pass);

  if (login && pass) {
    const res = await fetch('http://pascal.fis.agh.edu.pl:3012/login', {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({ username: login, password: pass }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (res.status === 200) {
      const json = await res.json();
      console.log(json);
      setCookie("accessToken", json.accessToken)
      setCookie("refreshToken", json.refreshToken)
      console.log(getCookie("refreshToken"));
    }
  }
})

document.querySelector('#load-btn').addEventListener('click', async () => {
  const res = await fetch('http://pascal.fis.agh.edu.pl:2012/books', {
    method: "GET",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie("accessToken"),
    },
  })
  if (res.status === 200) {
    const json = await res.json();
    let div = document.querySelector('#load-res');
    div.innerHTML = "";
    json.forEach(el => {

    })
  }
})

//curl -i -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzEwOTgxMDMsImV4cCI6MTY3MTA5OTMwM30.oLBdnEoYBS5d67wm_NuC7qJPpx5QIBFDrOi_fifUEs4" -X GET http://localhost:2012/books
