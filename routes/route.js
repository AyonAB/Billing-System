var express = require('express'),
    indexController = require('./../controllers/authentication'),
    middleware = require('./../middleware/middle'),
    passport = require('passport'),
    router = express.Router();

//router.get('/addUser', indexController.addUser);
//router.post('/saveUser', indexController.saveUser);
router.use(middleware.isLoginCheck);
//router.get('/', indexController.index);
router.get('/index', indexController.index);
router.get('/pages-forget', indexController.pagesForget);
router.post('/index', function(request, response, next){
      passport.authenticate('local', function(err, user, info) {
          if (err) {
              return next(err);
          }
          if (!user) {
              var message = "Invalid credentials";
              return response.render('index',{message: info.message, userLoggedIn : null});
          }
          request.logIn(user, function(err) {
              if (err) { return next(err); }
              request.session.user = request.user;
              response.redirect('/dashboard');
          });
      })(request, response, next);
  });
  router.get('/logout', indexController.logout);
  router.get('/dashboard', indexController.dashboard);
  router.get('/addbill', indexController.addBill);
  router.get('/addemp', indexController.addEmp);
  router.get('/addproduct', indexController.addProduct);
  router.get('/manage-bill', indexController.manageBill);
  router.get('/manage-emp', indexController.manageEmp);  
  router.get('/manage-product', indexController.manageProduct);
  router.post('/addproduct', indexController.saveProduct);
  module.exports = router;