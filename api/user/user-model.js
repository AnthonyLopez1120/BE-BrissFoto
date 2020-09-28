const db = require('../../data/dbConfig.js')

const find = () => {
    return db('user')
}

const findById = (id) => {
    return db('user')
    .where({ id })
    .first()
}

const findBy = (filter) => {
    return db('user')
    .where(filter)
}

const add = (user) => {
    return db('user')
    .insert(user, "id")
}

const update = (changes, id) => {
    return db('user')
    .where({ id })
    .update(changes)
}

const remove = (id) => {
    return db('user')
    .where({ id })
    .del()
}

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}