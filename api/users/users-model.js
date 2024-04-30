const db = require('../../data/dbConfig.js');

function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    return db('users').insert(user, 'id').then(ids => {
        const [id] = ids;
        return findById(id);
    });
}

function findById(id) {
    return db('users').where({ id }).first();
}

module.exports = {
    findBy,
    add,
    findById
};