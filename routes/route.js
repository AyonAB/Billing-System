var express = require('express'),
    indexController = require('./../controllers/authentication'),
    middleware = require('./../middleware/middle'),
    passport = require('passport'),
    router = express.Router();

//router.get('/addUser', indexController.addUser);
//router.post('/saveUser', indexController.saveUser);
router.use(middleware.isLoginCheck);
// router.get('/test', indexController.test);
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
          if (user.active == false) {
              var message = "Deactivated Account! Contact Your Admin!";
              return response.render('index',{message: message, userLoggedIn : null});
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
  router.get('/invoice',indexController.invoice);
  router.get('/deleteProduct/:id', indexController.deleteProduct);
  router.get('/showBill/:id', indexController.showBill);
  router.get('/activeEmp/:id', indexController.activeEmp);
  router.post('/addproduct', indexController.saveProduct);
  router.post('/addbill', indexController.saveBill);
  router.post('/addemp', indexController.saveEmp);
  module.exports = router;