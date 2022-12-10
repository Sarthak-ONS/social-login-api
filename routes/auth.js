const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/auth/login')
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}), (req, res) => {
    res.send('Login with Google')
})

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.send(req.user)
})

module.exports = router

