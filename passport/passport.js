const passport = require('passport')
const User = require('../Models/user')

var GoogleStrategy = require('passport-google-oauth20').Strategy


passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
    await User.findById(id, function (err, user) {
        done(err, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: '404320409698-3qha07g62ql7nfij2sbpccnusdsdasdj722jfqd.apps.googleusercontent.com',
    clientSecret: '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3bmHjs',
    callbackURL: 'http://localhost:4000/auth/google/callback'
}, (accessToken, refreshToken, profile, next) => {
    console.log("Access token is :  ", accessToken);
    console.log("Refresh token is :  ", refreshToken);
    console.log('My profile', profile);

    User.findOne({ email: profile._json.email }).then(user => {
        if (user) {
            console.log("User Already Exists in DB", user);

            next(null, user)
        } else {
            User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile._json.email
            }).then(user => {
                console.log("new User", user);
                next(null, user)
            })
                .catch(err => console.log(err))
        }

    })

    //  next()
    //callback
})
)