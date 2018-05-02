var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create schema for product
var bill = new Schema({
    name:{type: String, required: [true, '{PATH} is required']},
    cname: {type: String, required: [true, '{PATH} is required']},
    address: {type: String, required: [true, '{PATH} is required'] },
    city: {type: String, required: [true, '{PATH} is required'] },
    postal: {type: Number, min: [0, 'Can not be a negetive value'], required: [true, '{PATH} is required']},
    mobile: {type: Number, min: [0, 'Can not be a negetive value'], required: [true, '{PATH} is required']},
    email: {type: String, required: [true, '{PATH} is required'] },
    date: {type: String, required: [true, '{PATH} is required'] },
    product: {type: Array, required: [true, '{PATH} is required'] },
    sell: {type: Array, required: [true]},
    //quantity: {type: Number, min: [0, 'Can not be a negetive value'] },
    CGST: {type: Array, required: [true]},
    SGST: {type: Array, required: [true]},
    price: {type: Number, default: 0, required: [true]}
});

// we need to create a model using it
var Bill = mongoose.model('Bill', bill);

// make this available to our users in our Node applications
module.exports = Bill;