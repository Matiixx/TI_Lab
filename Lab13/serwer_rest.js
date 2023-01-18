const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')
const mongodb = require('mongodb')
var db
const dbname = '0cichostepski';
const url = 'mongodb://0cichostepski:pass0cichostepski@172.20.44.25/0cichostepski';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))

mongodb.MongoClient.connect(url, function (err, client) {
    if (err) return console.log(err)
    db = client.db(dbname);
    console.log('Connect OK');
})

app.listen(11001, function () {
    console.log('listening on 11001')
})

app.get('/', function (req, res) {
    res.send('Aplikacja CRUD - node.js')
})

app.get('/app', function (req, res) {
    res.sendFile(__dirname + '/client/klient.html')
})

app.get('/rest.js', function (req, res) {
    res.sendFile(__dirname + '/klient/rest.js');
});

app.post('/stud', function (req, res) {
    console.log(JSON.stringify(req.body))
    db.collection('student').insertOne(req.body, function (err, result) {
        if (err) return console.log(err)
        console.log('Rekord dodany do bazy')
        res.end('{"inserted record":"' + result.insertedCount + '"}')
    })
})

app.get('/stud', function (req, res) {
    var cursor = db.collection('student').find().toArray(function (err, results) {
        if (err) return console.log(err)
        res.end(JSON.stringify(results))
        console.log(results)
    })
})

app.get('/stud/:id', function (req, res) {
    console.log(req.params.id)
    console.log(req.query)
    if (req.query.flag && req.query.flag == 1) {
        db.collection('student').findOne({ ident: req.params.id }, function (err, result) {
            if (err) return console.log(err)
            res.end(JSON.stringify(result))
            console.log(result)
        })
    } else {
        db.collection('student').findOne({ _id: new mongodb.ObjectId(req.params.id) }, function (err, result) {
            if (err) return console.log(err)
            res.end(JSON.stringify(result))
            console.log(result)
        })
    }
})

app.delete('/stud/:id', function (req, res) {
    console.log(req.params.id)
    console.log(req.query)
    if (req.query.flag && req.query.flag == 1) {
        db.collection('student').findOne({ ident: req.params.id }, function (err, result) {
            if (err) return console.log(err)
            res.end(JSON.stringify(result))
            console.log(result)
        })
    } else {
        db.collection('student').deleteOne({ _id: new mongodb.ObjectId(req.params.id) }, function (err, result) {
            if (err) return console.log(err)
            console.log('Rekord usuniety z bazy - ' + req.params.id)
            res.end('{"Documents deleted ":"1"}')
        })
    }
})

app.put('/stud/:id', function (req, res) {
    console.log(req.params.id)
    console.log(req.query)
    console.log(req.body)
    data = req.body
    if (req.query.flag && req.query.flag == 1) {
        db.collection('student').findOne({ ident: req.params.id }, function (err, result) {
            if (err) return console.log(err)
            res.end(JSON.stringify(result))
            console.log(result)
        })
    } else {
        db.collection('student').updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: data }, function (err, result) {
            if (err) return console.log(err)
            console.log('rekord poprawiony - ' + req.params.id)
            console.log(result.modifiedCount)
            console.log(result.matchedCount)
            res.end('{"Document updated ":"' + result.modifiedCount + '"}')
        })
    }
})

app.get('/stud/nazwisko/:nazw', (req, res) => {
    var cursor = db.collection('student').find({ lname: req.params.nazw }).toArray(function (err, results) {
        if (err) return console.log(err)
        res.end(JSON.stringify(results))
    })
})