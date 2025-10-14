const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController")

// TODO: Mettre en protection la route getUsers
// router.get("/", controller.getUsers);

router.get("/login", controller.renderLogin)
router.post("/login", controller.login);

router.get("/register", controller.renderRegister)
router.post("/register", controller.register);

module.exports = router;
