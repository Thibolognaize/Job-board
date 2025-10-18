const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController");

router.get("/login", controller.renderLogin);
router.post("/login", controller.login);

router.get("/register", controller.renderRegister);
router.post("/register", controller.register); // CREATE

router.get("/profil", controller.renderProfil)
router.post("/profil", controller.updateProfil); // UPDATE
/* router.post("/user/:userId", controller.logoutProfil); // Jsp ?
router.delete("/user/:userId", controller.deleteUser); // DELETE */

module.exports = router;