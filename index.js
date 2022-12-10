const express = require('express')

const app = express()

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('home')
})


app.listen(4000, () => {
    console.log("Server is runnning at port 4000")
})