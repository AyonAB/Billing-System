var express = require("express"),
  indexController = require("./../controllers/authentication"),
  middleware = require("./../middleware/middle"),
  passport = require("passport"),
  router = express.Router();

router.use(middleware.isLoginCheck);

router.get("/index", indexController.index);
router.get("/forgot-pass", indexController.pagesForget);
router.get("/reset/:token", indexController.pagesReset);
router.get("/logout", indexController.logout);
router.get("/dashboard", indexController.dashboard);
router.get("/addbill", indexController.addBill);
router.get("/addemp", indexController.addEmp);
router.get("/report", indexController.genReport);
router.get("/profile", indexController.profile);
router.get("/addproduct", indexController.addProduct);
router.get("/manage-bill", indexController.manageBill);
router.get("/manage-emp", indexController.manageEmp);
router.get("/manage-product", indexController.manageProduct);
router.get("/invoice", indexController.invoice);
router.get("/deleteProduct/:id", indexController.deleteProduct);
router.get("/showBill/:id", indexController.showBill);
router.get("/activeEmp/:id", indexController.activeEmp);
router.post("/reset-pass/:token", indexController.resetPass);
router.post("/forgot", indexController.forgotPass);
router.post("/report", indexController.viewReport);
router.post("/index", function(request, response, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      var message = "Invalid credentials";
      var successMessage = "";
      return response.render("index", {
        message: info.message,
        successMessage: successMessage,
        userLoggedIn: null
      });
    }
    if (user.active == false) {
      var message = "Deactivated Account! Contact Your Admin!";
      var successMessage = "";
      return response.render("index", {
        message: message,
        successMessage: successMessage,
        userLoggedIn: null
      });
    }
    request.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      request.session.user = request.user;
      response.redirect("/dashboard");
    });
  })(request, response, next);
});
router.post("/addproduct", indexController.saveProduct);
router.post("/addbill", indexController.saveBill);
router.post("/addemp", indexController.saveEmp);
router.post("/updateProduct/:id", indexController.editProduct);
module.exports = router;
