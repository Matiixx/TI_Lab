const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
var db
const dbname = '0cichostepski';
const url = 'mongodb://0cichostepski:pass0cichostepski@172.20.44.25/0cichostepski';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

mongodb.MongoClient.connect(url, function (err, client) {
  if (err) return console.log(err)
  db = client.db(dbname);
  console.log('Connected to db');
})

app.listen(2012, function () {
  console.log('listening on 2012')
})

app.get('/', function (req, res) {
  res.send('Aplikacja CRUD - node.js')
})

app.get('/form', function (req, res) {
  res.sendFile(__dirname + '/form.html')
})

app.post('/stud', function (req, res) {
  console.log(req.body)
  db.collection('stud').insertOne(req.body, function (err, result) {
    if (err) return console.log(err)
    console.log('Rekord dodany do bazy')
    res.end('{"inserted record":"' + result.insertedCount + '"}')
  })
})

app.get('/stud', function (req, res) {
  const cursor = db.collection('stud').find().toArray(function (err, results) {
    if (err) return console.log(err)
    res.end(JSON.stringify(results))
    console.log(results)
  })
})

app.get('/stud/:id', function (req, res) {
  console.log(req.params.id)
  db.collection('stud').findOne({ _id: new mongodb.ObjectId(req.params.id) }, function (err, result) {
    if (err) return console.log(err)
    res.end(JSON.stringify(result))
    console.log(result)
  })
})

app.delete('/stud/:id', function (req, res) {
  console.log(req.params.id)
  db.collection('stud').deleteOne({ _id: new mongodb.ObjectId(req.params.id) }, function (err, result) {
    if (err) return console.log(err)
    console.log('Rekord usuniety z bazy - ' + req.params.id)
    res.end('"Documents deleted ":"1"}')
  })
})

app.put('/stud/:id', function (req, res) {
  console.log(req.params.id)
  console.log(req.body)
  data = req.body
  db.collection('stud').updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: data }, function (err, result) {
    if (err) return console.log(err)
    console.log('rekord poprawiony - ' + req.params.id)
    console.log(result.modifiedCount)
    console.log(result.matchedCount)
    res.end('"Document updated ":"' + result.modifiedCount + '"}')
  })
})