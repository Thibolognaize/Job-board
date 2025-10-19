const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController");

router.get("/login", controller.renderLogin);
router.post("/login", controller.login);

router.get("/register", controller.renderRegister);
router.post("/register", controller.register); // CREATE

router.get("/profil/:userId", controller.renderProfil); //READ
router.post("/profil/:userId", controller.updateProfil); // UPDATE
router.delete("/profil/:userId", controller.deleteAccount); // DELETE

module.exports = router;
