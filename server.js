require('dotenv').config();
const express = require("express");
const app = express();
const port = 3000;
const db = require('./models/db');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const { isAuthenticated } = require("./middlewares/auth");


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // nécessaire pour la récup des données de formulaire

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// view engine is ejs
app.set("view engine", "ejs");

// serve the public folder
app.use(express.static('public'));
app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/public/favicon.ico');
});

// Routes
app.get("/", isAuthenticated, (req, res) => {
    res.render("index");
});


// Tous nos routers
const userRouter = require("./routes/User");
const advertisementRouter = require("./routes/Advertisement");
const adminRouter = require("./routes/Admin")
// Nos routes utilisées
app.use("/user", userRouter);
app.use("/advertisements", advertisementRouter);
app.use("/admin", adminRouter)

// port listening is 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    db ? console.log(`Database is connected`) : console.log(`Database is not found`);
});