const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController")
const loginController = require("../controllers/LoginController"); //comme notre formulaire recup avec /user/login j'ai ajouté ici
const registerController = require("../controllers/RegisterController");

router.get("/", controller.get);
router.post("/login", loginController.login);
router.post("/register", registerController.register);

module.exports = router;
