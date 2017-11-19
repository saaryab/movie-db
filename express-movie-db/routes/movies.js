var express = require('express');
var router = express.Router();
var mongoDb = require('./../lib/mongo')
var ObjectID = require('mongodb').ObjectID

router.get('/', function (req, res, next) {
  mongoDb(db => db.collection('movies').find().toArray((err, result) => {
    if (err) 
      throw err
      // console.log(result)
    res.send(result);
  }))
});

router.patch('/:movieId', function (req, res, next) {
  const movie = req.body.movie
  movie._id = ObjectID(req.params.movieId)  
  mongoDb(db => db.collection('movies').updateOne({
    _id: ObjectID(req.params.movieId)
  }, {$set: movie})
  .catch(console.error).then(result => res.send(result)))
});

router.put('/', function (req, res, next) {
  mongoDb(db => db.collection('movies').insertOne(req.body.movie)
  .catch(console.error).then(result => res.send({ movie: req.body.movie, result: result})))
});

router.delete('/:movieId', function (req, res, next) {
  mongoDb(db => db.collection('movies').deleteOne({
    _id: ObjectID(req.params.movieId)
  }).catch(console.error).then(result => res.send(result)))
});

module.exports = router;
