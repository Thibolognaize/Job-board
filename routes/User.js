const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController")

router.get("/", controller.get);
router.post("/login", (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password);
    res.send("Login reçu !");
});

module.exports = router;
