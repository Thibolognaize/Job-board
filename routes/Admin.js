const express = require("express");
const router = express.Router();

const {isAuthenticated, isAdmin} = require("../middlewares/auth");
const controller = require("../controllers/AdminController");

// Index de l'espace admin
router.get("/", isAuthenticated, isAdmin, controller.get);

module.exports = router;