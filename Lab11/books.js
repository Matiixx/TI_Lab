const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongodb = require('mongodb')
var db
const dbname = '0cichostepski';
const url = 'mongodb://0cichostepski:pass0cichostepski@172.20.44.25/0cichostepski';

const jwt = require('jsonwebtoken');
const app = express();


const accessTokenSecret = 'somerandomaccesstoken';

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

mongodb.MongoClient.connect(url, function (err, client) {
  if (err) return console.log(err)
  db = client.db(dbname);
  console.log('Connected to db');
})

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

app.get('/books', authenticateJWT, (req, res) => { //books should be only visible to authenticated users →. middleware for authentication.
  const cursor = db.collection('books').find().toArray(function (err, results) {
    if (err) return console.log(err)
    console.log("GET /books")
    res.status(200);
    res.end(JSON.stringify(results))
  })
});

app.post('/books', authenticateJWT, (req, res) => {
  const { role } = req.user;
  console.log("POST /books")

  if (role !== 'admin') {
    return res.sendStatus(403);
  }


  const book = req.body;
  console.log(req.body);

  const cursor = db.collection('books').insertOne(book, function (err, results) {
    if (err) return console.log(err)
    console.log('Rekord dodany do bazy')
    res.send('book added successfully');
  })

});

app.delete('/books/:id', authenticateJWT, (req, res) => {
  const { role } = req.user;
  console.log("DELETE /books")

  if (role !== 'admin') {
    return res.sendStatus(403);
  }

  const bookId = req.params.id;
  console.log(bookId);

  db.collection('books').deleteOne({ _id: new mongodb.ObjectId(bookId) }, (err, result) => {
    if (err) return console.log(err)
    console.log('Rekord usuniety z bazy - ' + req.params.id)
    res.status(200);
    res.end('"Documents deleted ":"1"}')
  })

})

app.put('/books/:id', authenticateJWT, (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  console.log((req.body));
  db.collection('books').updateOne({ _id: new mongodb.ObjectId(bookId) }, { $set: updatedBook }, (err, result) => {
    if (err) return console.log(err)
    console.log('rekord poprawiony - ' + req.params.id)
    console.log(result)
    console.log(result.matchedCount)
    res.end('"Document updated ":"' + result.modifiedCount + '"}')
  })
})

app.listen(2032, () => {
  console.log('Books service started on port 2012');
});