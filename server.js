const express = require("express");
const app = express();
const port = 3000;

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://admin:prrrout@localhost:5432/jobboard_db')
// view engine is ejs
app.set("view engine", "ejs")

app.use(express.static('public'))

app.use(logger)

// route for / renders index.html
app.get("/", (req, res) => {
    res.render("index")
})

// Toutes les routes d'user
const userRouter = require("./routes/user")

// Routes utilisées
app.use("/user", userRouter)

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

// port listening is 3000
app.listen(port);