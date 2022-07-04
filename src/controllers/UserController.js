let UserModel = require("../models/UserModel");

class UserController {

    async create(req, res) {
        let {name, email, password} = req.body;

        await UserModel.create(name, email, password);
        
        return res.status(200).send('User created successfully!');
    }

    async read(req, res) {
        let users = await UserModel.findAll();
        res.status(200).json(users);
    }

    async readById(req, res) {
        let id = req.params.id;
        let user = await UserModel.findById(id);
        if(user == undefined) {
            return res.status(404).json({error: "User not found"});
        } else {
            return res.status(200).json(user);
        }
    }

    async update(req, res) {
        let { id, name, email } = req.body;
        let result = await UserModel.update(id, name, email);
        if(!result.error) {
            return res.status(200).send('User updated successfully');
        } else {
            return res.status(result.status).json(result);
        }
    }

    async delete(req, res) {
        let id = req.params.id;

        let result = await UserModel.delete(id);

        if(!result.error) {
            return res.status(200).send("User deleted successfully");
        } else {
            return res.status(result.status).send(result);
        }
    }

}

module.exports = new UserController();