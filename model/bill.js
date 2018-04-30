var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create schema for product
var bill = new Schema({
    name:{type: String, required: [true, '{PATH} is required']},
    cname: {type: String, required: [false, '{PATH} is required']},
    address: {type: String, required: [true, '{PATH} is required'] },
    city: {type: String, required: [true, '{PATH} is required'] },
    postal: {type: Number, min: [0, 'Can not be a negetive value'], required: [true, '{PATH} is required']},
    mobile: {type: Number, min: [0, 'Can not be a negetive value'], required: [true, '{PATH} is required']},
    email: {type: String, required: [true, '{PATH} is required'] },
    date: {type: Date, required: [true, '{PATH} is required'], default: Date.now },
    product: {type:[[String]], required: [true, '{PATH} is required'] },
    //quantity: {type: Number, min: [0, 'Can not be a negetive value'] },
    CGST: {type: Number},
    SGST: {type: Number},
    price: {type: Number}
});

// we need to create a model using it
var Bill = mongoose.model('Bill', bill);

// make this available to our users in our Node applications
module.exports = Bill;