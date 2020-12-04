const db = require('../../data/dbConfig.js');

const find = () => {
    return db('blog')
}

const findById = (id) => {
    return db('blog')
        .where({ id })
        .first()
}

const findBy = filter =>{
    return db('blog')
        .where({filter})
}

const add = post => {
    return db('blog')
        .insert(post)
}

const edit = (update, id) =>{
    return db('blog')
        .where({ id })
        .update(update)
}

const remove = id => {
    return db('blog')
        .where({ id })
        .del()
}

module.exports = {
    find, 
    findById,
    findBy,
    add,
    update,
    remove
}
