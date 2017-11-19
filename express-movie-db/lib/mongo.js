var MongoClient = require('mongodb').MongoClient
var config = require('./../config.json')

module.exports = func => MongoClient
    .connect(config.mongoDbConnection)
    .catch(console.error)
    .then(db => {
        func(db)
        return db
    })
    .then(db => db.close())