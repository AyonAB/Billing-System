var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create schema for product
var product = new Schema({
    brand:{type: String, required: [true, '{PATH} is required']},
    pname: {type: String, required: [true, '{PATH} is required']},
    serialno: {type: String, required: [true, '{PATH} is required'] },
    buy: {type: Number, min: [0, 'Can not be a negetive value'], required: [true, '{PATH} is required']},
    sell: {type: Number, min: [0, 'Can not be a negetive value'], required: [true, '{PATH} is required']},
    CGST: {type: Number, required: [true, '{PATH} is required'] },
    SGST: {type: Number, required: [true, '{PATH} is required'] }
});


// we need to create a model using it
var Product = mongoose.model('Product', product);

// make this available to our users in our Node applications
module.exports = Product;