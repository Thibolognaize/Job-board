const express = require("express");
const app = express();
const port = 3000;

const db = require('./models/db');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine is ejs
app.set("view engine", "ejs")

// serve the public folder
app.use(express.static('public'))

app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/public/favicon.ico');
});

// Routes 
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/register", (req, res) => {
    res.render("register")
})

// Tous nos routers
const userRouter = require("./routes/User");
const advertisementRouter = require("./routes/Advertisement");


//middleware acces info forms
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Nos routes utilisées
app.use("/user", userRouter);
app.use("/advertisements", advertisementRouter);


// port listening is 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
    db ? console.log(`Database is connected`) : console.log(`Database is not found`)
});
