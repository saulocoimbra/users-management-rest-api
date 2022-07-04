const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const Validation = require("../middlewares/validation/Validation");
const userValitationRules = require("../middlewares/validation/rules/userValidation");
const userUpdateValidationRules = require("../middlewares/validation/rules/userUpdateValidation");
const userIdValidationRules = require("../middlewares/validation/rules/userIdValidation");

router.route('/')
    .get(HomeController.index);

router.route('/user')
    .post(userValitationRules, Validation, UserController.create)
    .get(UserController.read)
    .put(userUpdateValidationRules, Validation, UserController.update);

router.route('/user/:id')
    .get(UserController.readById)
    .delete(userIdValidationRules, Validation, UserController.delete);

module.exports = router;