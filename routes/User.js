const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController")
const controller2 = require("../controllers/LoginController")

// TODO: Mettre en protection la route getUsers
// router.get("/", controller.getUsers);

router.get("/login", controller.renderLogin)
router.post("/login", controller2.login2);

router.get("/register", controller.renderRegister)
router.post("/register", controller.register);

router.get("/profil", controller.renderProfil)
router.post("/profil", controller.update);


module.exports = router;
