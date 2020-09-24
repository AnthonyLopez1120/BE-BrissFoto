const express = require('express')
const Users = require('./user-model.js');
const router = express.Router();
const restricted = require('../auth/authenticate-middleware');


router.get('/', (req, res) => {
    Users.find()
    .then((users) => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to retrieve usrs', err})
    });
});

router.get('/me', restricted, (req, res) => {
    Users.findById(req.decodedToken.subject)
    .then((user) =>{
        delete user.password;
        res.status(201).json(user);
    })
    .catch((err) => {
        res.status(500).json({ message: "Failed to get user by ID" })
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then((user) => {
            user ? res.json(user) : res.status(404).json({ message: 'Cant find a user with that ID' })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get user', err })
        })
})

router.post('/', (req, res) => {
    const userData = req.body;

    Users.add(userData)
        .then((user) => {
            res.status(201).json(user)
        })
        .catch((err) => {
            res.status(500).json({ message: "failed to create a new user", err})
        })
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.findById(id)
    .then((user) =>{
        if (user){
            Users.update(changes, id)
            .then((updateUsers) => {
                res.json(updateUser)
            })
        }else{
            res.status(404).json({ message: 'Could not find a user with that id'})
        }
    })
    .catch((err) => {
        res.status(500).json({ message: "Failed to update user", err })
    })
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then((deleted) => {
            deleted ? res.json({ removed: deleted }) : res.status(404).json({ message: "could not find a user with that id" })
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to delete user", err })
        })
})  

module.exports = router;