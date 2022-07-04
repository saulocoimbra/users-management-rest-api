const { body } = require("express-validator");
const UserModel = require("../../../models/UserModel");

const userUpdateValidationRules = [
    body('id')
        .isNumeric({no_symbols: true})
        .withMessage("Invalid Id")
        .custom( async value => {
            return await UserModel.findById(value).then(user => {
                if(user == undefined) {
                    return Promise.reject('User does not exists');
                }
            })
        }),
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
        .isEmail()
        .withMessage("Invalid e-mail")
        .trim()
        .escape(),
];

module.exports = userUpdateValidationRules;
