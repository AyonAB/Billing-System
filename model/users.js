var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var saltRounds = 10;

//custom validator
var minDigitsvalidator = function(val) {
        return val.toString().length >= 10;
    };

//create schema
//parent User/Employee Schema
var user = new Schema({
    name:{type: String, required: [true, '{PATH} is required']},
    username: {type: String, required: [true, '{PATH} is required']},
    password: {type: String, required: [true, '{PATH} is required'] },
    admin: {type: Boolean, default: false},
    active: {type: Boolean, default: true},
    address: {type: String, required: [true, '{PATH} is required']},
    email: {type: String, required: [true, '{PATH} is required']},
    mobile: {type: Number, required: [true, '{PATH} is required'],
    validate: [minDigitsvalidator, '{PATH} must have 10 digits']},
    joining_date: {type: String, required: [true, '{PATH} is required']},
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

/*user.pre('update', function(next) {
});
user.pre('validate', function(next) {
});*/

// before saving document to mongodb
user.pre('save', function (next) {
    var self = this;
    mongoose.models["User"].findOne({username : self.username}, function(err, user) {
        if (!user){
            bcrypt.hash(self.password, saltRounds, function (err, hash) {
                if (err) {
                    return next (err);
                } else {
                    self.password = hash;
                    next();
                }
            });
        }else{
            next(new Error("Username already exists!"));
        }
    });
});

// static methods which can be called on document
user.statics = {
    bcryptpassword: function (data, cb) {
        bcrypt.hash(data, saltRounds, function (err, hash) {
            if (err) {
                return cb(err);
            } else {
                return cb(null, hash);
            }
        });
    },
};

// instance methods which can be called on instacnce only
user.methods = {
    comparePassword: function (data, cb) {
        bcrypt.compare(data, this.password, function (err, passRes) {
            if (err) {
                return cb(err);
            } else {
                return cb(null, passRes);
            }
        });
    },
};

// we need to create a model using it
var User = mongoose.model('User', user);

// make this available to our users in our Node applications
module.exports = User;