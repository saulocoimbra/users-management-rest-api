const bcrypt = require("bcryptjs");

const hash = bcrypt.hashSync('senhaABC123.', 10);


exports.seed = knex => knex('users').del().then(() => knex('users').insert([
        {name: 'Saulo Coimbra', email: 'saulomcoimbra@gmail.com', password: hash},
        {name: 'Usuario Teste', email: 'usuarioteste@gmail.com', password: hash},
        {name: 'Teste Usuario', email: 'testeusuario@gmail.com', password: hash},
      ])
);
