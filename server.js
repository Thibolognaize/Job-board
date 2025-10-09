const express = require("express");
const app = express();
const port = 3000;

const db = require('./models/db');

app.use(express.json());

// view engine is ejs
// app.set("view engine", "ejs")

// app.use(express.static('public'))

// app.use(logger)

// // route for / renders index.html
// app.get("/", (req, res) => {
//     res.render("index")
// })

// // Toutes les routes d'user
const userRouter = require("./routes/User")

// // Routes utilisées
app.use("/users", userRouter)

// function logger(req, res, next) {
//     console.log(req.originalUrl)
//     next()
// }

// port listening is 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
    db ? console.log(`Database is connected`) : console.log(`Database is not found`)
});