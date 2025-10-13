require('dotenv').config();
const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
const db = require('./models/db');

// Donnée de sessions
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Mettre à true pour HTTPS
    httpOnly: true,
    maxAge: null
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // nécessaire pour la récup des données de formulaire

// Middleware pour ajouter les données de la session à chaque vue
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// middlewares
// Fonction pour vérifier que le user est identifié
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect("/user/login"); // Redirige vers login
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === "admin") {
        return next();
    } else {
        res.redirect("/");
    }
}

// view engine is ejs
app.set("view engine", "ejs");

// serve the public folder
app.use(express.static('public'));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/public/favicon.ico');
});

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

// Route protégée par le middleware isAdmin
app.get("/admin", (req, res) => {
    res.render("admin");
});

// Tous nos routers
const userRouter = require("./routes/User");
const advertisementRouter = require("./routes/Advertisement");

// Nos routes utilisées
app.use("/user", userRouter);
app.use("/advertisements", advertisementRouter);

// port listening is 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    db ? console.log(`Database is connected`) : console.log(`Database is not found`);
});
