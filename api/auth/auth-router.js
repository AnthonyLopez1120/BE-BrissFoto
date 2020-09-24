const router = require('express').Router();
const User = require('../user/user-model.js')
const bcrypt = require('bcrypt')
const secret = require('../config/secret.js')
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash

    User.add(user)
        .then(newUser => {
            if (user) {
                const token = generateToken(user)
                res.status(200).json({
                    message: `Bienvenidos amor ${user.user-name}`,
                    token,
                    newUser
                })
            }else{
                res.status(401).json({ message: "Invalid registration, try again" })
            }
            })
            .catch(err => {
                res(500).json({ message: "Error adding user", err })
            })   
});

router.post('/login', (req, res) => {
    const { username, password } = req.body

    User.findById({ username })
        .first()
        .then(user => {
            console.log(user)
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user)
                res.status(200).json({
                    message: `Hola mi amor ${user.username}`,
                    token,
                    user,
                })
            }else{
                res.status(401).json({ message: 'Incorrect password, try again'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occured while logging in', err})
        })
});

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '2d'
    }
    return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = router