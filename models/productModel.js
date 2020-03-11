const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ProductSchema = Schema({
    productType: {type: String, enum: ['Bolso']},
    name: String,
    description: String,
    price: { type:Number,default: 0},
    material: String,
    color: String,
    model: String,
    category: {type: String, enum:['Dama']},
    image: String
  })

module.exports = mongoose.model('Porduct',ProductSchema)