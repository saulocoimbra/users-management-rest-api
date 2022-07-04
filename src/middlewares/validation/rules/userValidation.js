const { body } = require("express-validator");
const UserController = require("../../../controllers/UserController");
const UserModel = require("../../../models/UserModel");

const userValidationRules = [
    body('name')
        .exists({checkFalsy: true, checkNull: true})
        .withMessage("User's name is invalid")
        .isLength({ min: 3})
        .withMessage("User's name must be at least 3 chars long")
        .isAlpha('pt-BR', {ignore: ' '})
        .withMessage("Username cannot contains numbers or special chars")
        .trim()
        .escape(),
    body('email')
        .exists({checkFalsy: true, checkNull: true})
        .withMessage("Invalid e-mail")
        .isEmail()
        .withMessage("Invalid e-mail")
        .trim()
        .escape()
        .custom( async value => {
            return await UserModel.findByEmail(value).then(user => {
                if(user != undefined) {
                    return Promise.reject('E-mail already in use');
                }
            });
        }),
    body('password')
        .exists({checkFalsy: true, checkNull: true})
        .withMessage("Invalid password")
        .isStrongPassword()
        .withMessage('Password must be combination of one uppercase , one lower case, one special char, one digit and at least 3 chars long ')
];

module.exports = userValidationRules;
