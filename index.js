const express = require('express')
const app = express()
const auth = require('./routes/auth')
const passportConfig = require('./passport/passport')
const cookieSession = require('cookie-session')

const mongoose = require('mongoose')
const passport = require('passport')


mongoose.connect('mongodb://127.0.0.1:27017/passport', () => {
    console.log("Db Connected Succeddfully.s");
})

app.use(cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: ['thisissecretkey']
}))

app.set('view engine', 'ejs')

app.use(passport.initialize())
app.use(passport.session())

const isLoggedin = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login')
    }
    next()
}

app.use('/auth', auth)


app.get('/', isLoggedin, (req, res) => {
    res.render('home')
})


app.listen(4000, () => {
    console.log("Server is runnning at port 4000")
})