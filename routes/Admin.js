const express = require("express");
const router = express.Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const controller = require("../controllers/AdminController");

// Index de l'espace admin
router.get("/", isAuthenticated, isAdmin, controller.get);
router.get("/companies", isAuthenticated, isAdmin, controller.getCompanies);
router.get("/users", isAuthenticated, isAdmin, controller.getUsers);
router.get("/user/:id", isAuthenticated, isAdmin, controller.getUserInfo);
router.get(
  "/advertisements",
  isAuthenticated,
  isAdmin,
  controller.getAdvertisements
);
router.get("/keywords", isAuthenticated, isAdmin, controller.getKeywords);

module.exports = router;
