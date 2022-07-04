const { param } = require("express-validator");
const UserModel = require("../../../models/UserModel");

const userIdValidationRules = [
    param('id')
        .isNumeric({no_symbols: true})
        .withMessage("Invalid Id")
        .custom( async value => {
            return await UserModel.findById(value).then(user => {
                if(user == undefined) {
                    return Promise.reject('User does not exists');
                }
            })
        })
];

module.exports = userIdValidationRules;