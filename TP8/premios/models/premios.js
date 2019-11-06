var mongoose = require('mongoose')

var laureatesSchema = new mongoose.Schema({
    id: String,
    firstname: String,
    surname: String,
    motivation: String,
    share: String
})

var premioSchema = new mongoose.Schema({
    year: String,
    category: String,
    overallMotivation: String,
    laureates: [laureatesSchema]
})

module.exports = mongoose.model('premios', premioSchema)