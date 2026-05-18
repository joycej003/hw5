//127.0.0.1:3000
//localhost:3000

require('dotenv').config()

const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient
const path = require('path')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))


let db
let booksCollection

MongoClient.connect(process.env.MONGO_URI)
.then(client => {
  console.log('Connected to Database')

  db = client.db('books')
  booksCollection = db.collection('books')

  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
.catch(error => console.error(error))


app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  booksCollection.find().toArray()
    .then(results => {
      res.render('index.ejs', { books: results })
    })
    .catch(error => console.error(error))
})

app.post('/books', (req, res) => {
  console.log(req.body)

  booksCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/books', (req, res) => {
  booksCollection.findOneAndUpdate(
    { title: req.body.newTitle },
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
      }
    },
    { upsert: true }
  )
  .then(result => {
    res.json('Success')
  })
  .catch(error => console.error(error))

})


app.delete('/books', (req, res) => {
  booksCollection.deleteOne(
    { title: req.body.title }
  )
  .then(result => {
    if (result.deletedCount === 0) {
      return res.json('No book to delete')
    }
    res.json('Deleted book')
  })
  .catch(error => console.error(error))
})

















