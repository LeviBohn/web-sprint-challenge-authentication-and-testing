const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
    return knex('users')
        .del()
        .then(function() {
            return knex('users').insert([
                { username: 'user1', password: bcrypt.hashSync('password1', 8) },
                { username: 'user2', password: bcrypt.hashSync('password2', 8) },
            ]);
        });
};