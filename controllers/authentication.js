'use strict';
var User = require('.././model/users');
var Product = require('.././model/product');
var Bill = require('.././model/bill');
module.exports = {
    index: function (request, response) {
        var user = request.session.user;
        var message = '';
        var successMessage = '';
        response.render('index', {message: message, userLoggedIn: user});
    },
    logout: function (request, response) {
        request.session.user = '';
        response.redirect('/index');
    },
    dashboard: function (request, response) {
        var loginUser = request.session.user;
        var message = '';
        var successMessage = '';
        response.render('dashboard', {message: message, userLoggedIn: loginUser});
    },
    addBill: function (request, response) {
        var loginUser = request.session.user;
        var message = '';
        var successMessage = '';
        var query = Product.find();
        query.sort({pname: 'desc'})
            .exec(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    response.render('addbill', {userLoggedIn: loginUser, message: message, successMessage: successMessage, product : data});
                }
            });
        //response.render('addbill', {message: message, successMessage: successMessage, userLoggedIn: loginUser});
    },
    addEmp: function (request, response) {
        var loginUser = request.session.user;
        var message = '';
        var successMessage = '';
        response.render('addemp', {message: message, successMessage: successMessage, userLoggedIn: loginUser});
    },
    addProduct: function (request, response) {
        var loginUser = request.session.user;
        var message = '';
        var successMessage = '';
        response.render('addproduct', {message: message, successMessage: successMessage, userLoggedIn: loginUser});
    },
    manageBill: function (request, response) {
        var loginUser = request.session.user;
        var message = '';
        var successMessage = '';
        var query = Bill.find();
        query.sort({date: 'desc'})
            .exec(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    response.render('manage-bill', {userLoggedIn: loginUser , bill : data});
                }
            });
        //response.render('manage-bill', {message: message, userLoggedIn: loginUser});
    },
    manageEmp: function (request, response) {
        var loginUser = request.session.user;
        var message = '';
        var successMessage = '';
        var query = User.find();
        query.sort({joining_date: 'desc'})
            .exec(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    response.render('manage-emp', {userLoggedIn: loginUser , user : data});
                }
            });
        //response.render('manage-emp', {message: message, userLoggedIn: loginUser});
    },
    manageProduct: function (request, response) {
        var loginUser = request.session.user;
        var message = '';
        var successMessage = '';
        var query = Product.find();
        query.sort({buy: 'desc'})
            .exec(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    response.render('manage-product', {userLoggedIn: loginUser , product : data});
                }
            });
        //response.render('manage-product', {message: message, userLoggedIn: loginUser});
    },
    pagesForget: function (request, response) {
        var user = request.session.user;
        var message = '';
        var successMessage = '';
        response.render('pages-forget', {message: message, successMessage: successMessage, userLoggedIn: user});
    },
    invoice: function (request, response) {
        var loginUser = request.session.user;
        var message = '';
        var successMessage = '';
        response.render('invoice', {message: message, successMessage: successMessage, userLoggedIn: loginUser});
    },
    saveProduct: function(request, response) {
        var loginUser = request.session.user;
        var product = new Product({
            brand: request.body.brand,
            pname: request.body.pname,
            serialno: request.body.serialno,
            buy: request.body.buy,
            sell: request.body.sell,
            CGST: request.body.CGST,
            SGST: request.body.SGST,
        });
        var error = product.validateSync();
        if (error) {
            response.render('addproduct', {message: error, successMessage: '', userLoggedIn: loginUser});
        } else {
            product.save(function (err) {
                if (err) {
                    // response.render('addproduct', {message: 'OOPS something went wrong !!! Please try again', user: loginUser});
                    response.render('addproduct', {message: err, successMessage: '', userLoggedIn: loginUser});
                } else {
                    //response.redirect('/addproduct');
                    response.render('addproduct', {successMessage: 'New Product is successfully added.', message: '', userLoggedIn: loginUser});
                }
            });
        }
    },
    saveEmp: function(request, response) {
        var loginUser = request.session.user;
        var user = new User({
            name: request.body.name,
            username: request.body.username,
            password: request.body.password,
            address: request.body.address,
            email: request.body.email,
            mobile: request.body.mobile,
            joining_date: request.body.date,
        });
        var error = user.validateSync();
        if (error) {
            response.render('addemp', {message: error, successMessage: '', userLoggedIn: loginUser});
        } else {
            user.save(function (err) {
                if (err) {
                    // response.render('addemp', {message: 'OOPS something went wrong !!! Please try again', user: loginUser});
                    response.render('addemp', {message: err, successMessage: '', userLoggedIn: loginUser});
                } else {
                    //response.redirect('/addemp');
                    response.render('addemp', {successMessage: 'New Employee is successfully registered.', message: '', userLoggedIn: loginUser});
                }
            });
        }
    },
    saveBill: function(request, response) {
        var loginUser = request.session.user;
        var arr = [];
        var bill = new Bill();
            arr = request.body.product;
            for(var i = 0; i<arr.length; i++){
                var query = Product.findOne({ pname: arr[i] });
                query.select('sell CGST SGST');
                query.exec(function (err, product){
                    var tempPrice = product.sell;
                    tempPrice = tempPrice + ((tempPrice * (product.CGST + product.SGST)) / 100);
                    bill.price = bill.price + tempPrice;
                    bill.CGST.push(product.CGST);
                    bill.SGST.push(product.SGST);
                    if (err) return handleError(err);
                });
            }        
        bill.name = request.body.name;
        bill.cname = request.body.cname;
        bill.address = request.body.address;
        bill.city = request.body.city;
        bill.postal = request.body.postal;
        bill.mobile = request.body.mobile;
        bill.email = request.body.email;
        bill.date = request.body.date;
        bill.product = request.body.product;
        setTimeout(function() {
            var error = bill.validateSync();
            if (error) {
                console.log(error);
                response.render('addbill', {message: error, successMessage: '', userLoggedIn: loginUser});
            } else {
                bill.save(function (err) {
                    if (err) {
                        // response.render('addbill', {message: 'OOPS something went wrong !!! Please try again', user: loginUser});
                        response.render('addbill', {message: err, successMessage: '', userLoggedIn: loginUser});
                    } else {
                        //response.redirect('/addemp');
                        response.render('invoice', {successMessage: '', message: '', bill: bill, userLoggedIn: loginUser});
                    }
                });
            }
        }, 3000);
            /*var bill = new Bill({
                name: request.body.name,
                cname: request.body.cname,
                address: request.body.address,
                city: request.body.city,
                postal: request.body.postal,
                mobile: request.body.mobile,
                email: request.body.email,
                date: request.body.date,
                product: request.body.product,
            });*/

    }
    /*userList: function (request, response) {
        var loginUser = request.session.user;*/
        /*User.find(function(err, data){
         if(err){
         console.log(err);
         }else{
         response.render('userList', { 'user' : data});
         }
         });*/
        /*var query = User.find();
        query.sort({created_at: 'desc'})
            .exec(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    response.render('userList', {userLoggedIn: loginUser , user : data});
                }
            });
    },
    addUser: function (request, response) {
        var user = request.session.user;
        response.render('addUser', {message: '', userLoggedIn: user});
    },
    saveUser: function (request, response) {
        var loginUser = request.session.user;
        var user = new User({
            //need to add an email here
            name: request.body.name,
            username: request.body.username,
            password: request.body.password,
            line1: request.body.line1,
            line2: request.body.line2,
            city: request.body.city,
            state: request.body.state,
            country: request.body.country,
            pincode: request.body.pincode,
        });
        var error = user.validateSync();
        if (error) {
            response.render('addUser', {message: error, userLoggedIn: loginUser});
        } else {
            user.save(function (err) {
                if (err) {
                    // response.render('addUser', {message: 'OOPS something went wrong !!! Please try again', user: loginUser});
                    response.render('addUser', {message: err, userLoggedIn: loginUser});
                } else {
                    response.redirect('/userList');
                }
            });
        }
    },
    updateUserView: function (request, response) {
        var loginUser = request.session.user;
        User.findById(request.params.id, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                response.render('updateUser', {message: '', userLoggedIn: loginUser , user: data});
            }
        });
    },
    updateUser: function (request, response) {
        var userInfo;
        var loginUser = request.session.user;
        var id = request.body.id;
        User.findById(id, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                userInfo = result;
                userInfo.name = request.body.name;
                userInfo.username = request.body.username;
                if (request.body.password != '') {
                    userInfo.password = request.body.password;
                } else {
                    userInfo.password = result.password
                }
                userInfo.line1 = request.body.line1;
                userInfo.line2 = request.body.line2;
                userInfo.city = request.body.city;
                userInfo.state = request.body.state;
                userInfo.country = request.body.country;
                userInfo.pincode = request.body.pincode;
                var error = userInfo.validateSync();
                if (error) {
                    request.body._id = request.body.id;
                    response.render('updateUser', {message: error, user : request.body, userLoggedIn: loginUser});
                } else {
                    userInfo.save(function (errs) {
                        if (errs) {
                            request.body._id = request.body.id;
                            response.render('updateUser', {message: errs, user : request.body, userLoggedIn: loginUser});
                        } else {
                            response.redirect('/userList');
                        }
                    });
                }
            }
        });

        */
        /*
         var userData = new User({
         name: request.body.name,
         username: request.body.username,
         // password: request.body.password,
         line1: request.body.line1,
         line2: request.body.line2,
         city: request.body.city,
         state: request.body.state,
         country: request.body.country,
         pincode: request.body.pincode,
         });
         var error = userData.validateSync();
         if(request.body.password !== null){
         console.log(request.body.password);
         }   
         var opts = {
         runValidators : true,
         strict : false,
         };
         console.log('hre before update');
         User.update({ _id: request.body.id}, request.body, opts, function(err, data){
         // User.save({ _id: request.body.id}, request.body, opts, function(err, data){
         if (err) {
         response.render('updateUser', {message: err, user: loginUser});
         } else {
         response.redirect('/userList');
         }
         });*/
    //},
    /*deleteUser: function (request, response) {
        var query = User.remove({_id: request.params.id});
        query.exec();
        response.redirect('/userList');
        /*User.remove({ _id : request.params.id}, function(err, data) {
         if (err){
         console.log(err);
         }else {
         response.redirect('/userList');
         }
         });*/
    //}
};