const express = require("express");
const app = express();

// view engine is ejs
app.set("view engine", "ejs")

// route for / renders index.html
app.get("/", (req, res) => {
    res.render("index")
})

// Toutes les routes d'user
const userRouter = require("./routes/users")

// Routes utilisées
app.use("/users", userRouter)

// port listening is 3000
app.listen("3000");