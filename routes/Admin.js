const express = require("express");
const router = express.Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const controller = require("../controllers/AdminController");

// Index de l'espace admin
router.get("/", isAuthenticated, isAdmin, controller.get);
router.get("/companies", controller.getCompanies);
router.get("/users", controller.getUsers);

router.get("/user/:userId", controller.getUserInfo);
router.post("/user/:userId", controller.postUserInfo);
router.delete("/user/:userId", controller.deleteUser);

router.get(
  "/advertisements",
  isAuthenticated,
  isAdmin,
  controller.getAdvertisements
);
router.get("/keywords", controller.getKeywords);

module.exports = router;
