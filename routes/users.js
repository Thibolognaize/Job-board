const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("list of all users")
});

router.get("/login", (req, res) => {
    res.send("Formulaire de login")
});

router.get("/register", (req, res) => {
    res.send("Formulaire d'enregistrement")
});

router.get("/profile", (req, res) => {
    res.send("Page de profile")
});

module.exports = router;