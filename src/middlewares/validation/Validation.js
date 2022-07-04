const { check, validationResult, body } = require("express-validator");

const Validation = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

module.exports = Validation;