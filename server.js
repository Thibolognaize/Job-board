const express = require("express");
const app = express();
const port = 3000;

const db = require('./models/db');

app.use(express.json());

// view engine is ejs
app.set("view engine", "ejs")

app.use(express.static('public'))

app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/public/favicon.ico');
});

// route 
app.get("/", (req, res) => {
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

// Toutes les routes d'user
const userRouter = require("./routes/User")

// Routes utilisées
app.use("/users", userRouter)

// port listening is 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
    db ? console.log(`Database is connected`) : console.log(`Database is not found`)
});