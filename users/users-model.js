const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findById,
    findBy
}

function find(){
    return db('users').select('id', 'username', 'password');
}

async function add(user){
    const [ id ] = await db('users').insert(user);
    return user;
}

function findById(id){
    return db('users')
    .where({ id })
    .first();
}

function findBy(filter){
    return db('users').where(filter);
}