const knex = require("../database/connection");
const bcrypt = require("bcryptjs");

class UserModel {

    async create(name, email, password) {
        try{
            let hash = await bcrypt.hash(password, 10);
            await knex.insert({name, email, password: hash}).table("users");
            return;

        } catch(err) {
            console.log(err);
            return err;
        }
    }

    async findAll() {
        try{
            let result = await knex.select("id", "name", "email").from("users");
            return result;
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }

    async findByEmail(email) {
        try{
            let user = await knex.select("id", "name", "email").from("users").where({email: email});
            if(user.length > 0) {
                return user[0];
            } else {
                return undefined;
            }
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async findById(id) {
        try{
            let user = await knex.select("id", "name", "email").from("users").where({id: id});
            if(user.length > 0) {
                return user[0];
            } else {
                return undefined;
            }
        } catch(err) {
            console.log(err);
            return err;
        }
    }

    async update(id, name, email) {
        let user = await this.findById(id);

        let userData = {};

        if(email != user.email) {
            let result =  await this.findByEmail(email);
            if(result == undefined) {
                userData.email = email;
            } else {
                return {status: 406, error: "E-mail already in use"}
            }
        }
        
        if(name != user.name) userData.name = name;

        try{
            await knex.update(userData).where({id: id}).table('users');
            return {status: true};
        } catch(err) {
            return {status: 500, error: err};
        }

    }
 
    async delete(id) {
        try{
            await knex.delete().from("users").where({id: id});
            return { status: 200 };
        } catch(err) {
            return { status: 500, error: err };
        }
    }
    
}

module.exports = new UserModel();
