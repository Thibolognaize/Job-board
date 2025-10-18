const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController");

router.get("/login", controller.renderLogin);
router.post("/login", controller.login);

router.get("/register", controller.renderRegister);
router.post("/register", controller.register);

router.get("/profil", controller.renderProfil)

module.exports = router;
