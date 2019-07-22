const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findById
}

function find(){
    return db('users').select('id', 'username', 'password');
}

function add(user){
    return db('user')
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id);
    })
}

function findById(id){
    return db('users')
    .where({ id })
    .first();
}