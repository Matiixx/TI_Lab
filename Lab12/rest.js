var request;
var objJSON;
var id_mongo;
function getRequestObject() {
  if (window.ActiveXObject) {
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } else if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } else {
    return (null);
  }
}

// Lista rekordow w bazie
function _list() {
  document.getElementById('result').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      objJSON = JSON.parse(request.response);
      var txt = "";
      for (var id in objJSON) {
        txt += id + ": {";
        for (var prop in objJSON[id]) {
          txt += prop + ":" + objJSON[id][prop] + ",";
        }
        txt += "}<br/>";
      }
      document.getElementById('result').innerHTML = txt;
    }
  }
  request.open("GET", "http://pascal.fis.agh.edu.pl/~0cichostepski/Lab12/rest/list", true);
  request.send(null);
}

// Wstawianie rekordow do bazy
function _ins_form() {
  var form1 = "<form name='add'><table>";
  form1 += "<tr><td>ident</td><td><input type='text' name='ident' value='ident' ></input></td></tr>";
  form1 += "<tr><td>fname</td><td><input type='text' name='fname' value='fname' ></input></td></tr>";
  form1 += "<tr><td>lname</td><td><input type='text' name='lname' value='lname' ></input></td></tr>";
  form1 += "<tr><td>faculty</td><td><input type='text' name='faculty' value='faculty' ></input></td></tr>";
  form1 += "<tr><td>year</td><td><input type='text' name='year' value='year' ></input></td></tr>";
  form1 += "<tr><td></td><td><input type='button' value='wyslij' onclick='_insert(this.form)' ></input></td></tr>";
  form1 += "</table></form>";
  document.getElementById('data').innerHTML = form1;
  document.getElementById('result').innerHTML = '';
}

function _search_form() {
  var form1 = "<form name='search'><table>";
  form1 += "<tr><td>lname</td><td><input type='text' name='lname' value='lname' ></input></td></tr>";
  form1 += "<tr><td></td><td><input type='button' value='Szukaj' onclick='_search(this.form)' ></input></td></tr>";
  form1 += "</table></form>";
  document.getElementById('data').innerHTML = form1;
  document.getElementById('result').innerHTML = '';
}

function _search(form) {
  const lname = form.lname.value;
  document.getElementById('result').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      if (request.readyState == 4) {
        objJSON = JSON.parse(request.response);
        var txt = "";
        for (var id in objJSON) {
          txt += id + ": {";
          for (var prop in objJSON[id]) {
            txt += prop + ":" + objJSON[id][prop] + ",";
          }
          txt += "}<br/>";
        }
        document.getElementById('result').innerHTML = txt;
      }
    }
  }
  request.open("GET", "http://pascal.fis.agh.edu.pl/~0cichostepski/Lab12/rest/searchByLname?lname=" + lname, true);
  request.send(null);

}

function _insert(form) {
  var user = {};
  user.ident = form.ident.value;
  user.fname = form.fname.value;
  user.lname = form.lname.value;
  user.faculty = form.faculty.value;
  user.year = form.year.value;
  txt = JSON.stringify(user);
  document.getElementById('result').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      document.getElementById('result').innerHTML = request.response;
    }
  }
  request.open("POST", "http://pascal.fis.agh.edu.pl/~0cichostepski/Lab12/rest/save", true);
  request.send(txt);
}

// Usuwanie rekordow z bazy danych
function _del_list() {
  document.getElementById('result').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      objJSON = JSON.parse(request.response);
      var txt = "<form name='data'><select name='del' size='10'>";
      for (var id in objJSON) {
        txt += "<option value=" + objJSON[id]._id.$oid + " >" + id + ": {";
        for (var prop in objJSON[id]) {
          txt += prop + ":" + objJSON[id][prop] + ",";
        }
        txt += "}</option>";
      }
      txt += "</select><br/><input type='button' value='usun' onclick='_delete(this.form)'/></form>";
      document.getElementById('data').innerHTML = txt;
    }
  }
  request.open("GET", "http://pascal.fis.agh.edu.pl/~0cichostepski/Lab12/rest/list", true);
  request.send(null);
}

function _delete(form) {
  var rec = form.del.selectedIndex;
  var id = document.getElementsByTagName('option')[rec].value;
  console.log(id);
  document.getElementById('result').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      document.getElementById('result').innerHTML = request.response;
    }
  }
  request.open("DELETE", "http://pascal.fis.agh.edu.pl/~0cichostepski/Lab12/rest/delete1/" + id, true);
  request.send(null);
}

// Poprawa rekordow w bazie danych
function _upd_list() {
  document.getElementById('result').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      objJSON = JSON.parse(request.response);
      var txt = "<form name='data'><select name='del' size='10'>";
      for (var id in objJSON) {
        txt += "<option value=" + objJSON[id]._id.$oid + " >" + id + ": {";
        for (var prop in objJSON[id]) {
          txt += prop + ":" + objJSON[id][prop] + ",";
        }
        txt += "}</option>";
      }
      txt += "</select><br/><input type='button' value='popraw' onclick='_upd_form(this.form)'/></form>";
      document.getElementById('data').innerHTML = txt;
    }
  }
  request.open("GET", "http://pascal.fis.agh.edu.pl/~0cichostepski/Lab12/rest/list", true);
  request.send(null);
}


function getIndex(child) {
  var i = 0;
  while ((child = child.previousSibling) != null)
    i++;
  return i;
}

function _upd_form(form) {
  var rec = form.del.selectedIndex;
  id_mongo = document.getElementsByTagName('option')[rec].value;
  document.getElementById('result').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  var form1 = "<form name='add'><table>";
  form1 += "<tr><td>ident</td><td><input type='text' name='ident' value='" + objJSON[rec]['ident'] + "' ></input></td></tr>";
  form1 += "<tr><td>fname</td><td><input type='text' name='fname' value='" + objJSON[rec]['fname'] + "' ></input></td></tr>";
  form1 += "<tr><td>lname</td><td><input type='text' name='lname' value='" + objJSON[rec]['lname'] + "' ></input></td></tr>";
  form1 += "<tr><td>faculty</td><td><input type='text' name='faculty' value='" + objJSON[rec]['faculty'] + "' ></input></td></tr>";
  form1 += "<tr><td>year</td><td><input type='text' name='year' value='" + objJSON[rec]['year'] + "' ></input></td></tr>";
  form1 += "<tr><td></td><td><input type='button' value='wyslij' onclick='_update(this.form)' ></input></td></tr>";
  form1 += "</table></form>";
  document.getElementById('data').innerHTML = form1;
  document.getElementById('result').innerHTML = '';
}

function _update(form) {
  var user = {};
  user.ident = form.ident.value;
  user.fname = form.fname.value;
  user.lname = form.lname.value;
  user.faculty = form.faculty.value;
  user.year = form.year.value;
  txt = JSON.stringify(user);
  document.getElementById('result').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      document.getElementById('result').innerHTML = request.response;
    }
  }
  request.open("PUT", "http://pascal.fis.agh.edu.pl/~0cichostepski/Lab12/rest/update1/" + id_mongo, true);
  request.send(txt);
}