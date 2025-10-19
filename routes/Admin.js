const express = require("express");
const router = express.Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const controller = require("../controllers/AdminController");

// Index de l'espace admin
router.get("/", isAuthenticated, isAdmin, controller.get);

// Controller Admin - Companies
router.get("/companies", controller.getCompanies);
router.get("/company/:companyId", controller.getCompanyInfo);
router.post("/company/:companyId", controller.postCompanyInfo);
router.delete("/company/:companyId", controller.deleteCompany);

// Controller Admin - Advertisements
router.get("/advertisements", controller.getAdvertisements);
router.get("/advertisement/:advertisementId", controller.getAdvertisementInfo);
router.post(
  "/advertisement/:advertisementId",
  controller.postAdvertisementInfo
);
router.delete(
  "/advertisement/:advertisementId",
  controller.deleteAdvertisement
);

// Controller Admin - Users
router.post("/user/:userId", controller.postUserInfo); // CREATE
router.get("/users", controller.getUsers); // READ
router.get("/user/:userId", controller.getUserInfo); // UPDATE
router.delete("/user/:userId", controller.deleteUser); // DELETE

// Controller Admin - Applications
router.get("/applications", controller.getApplications); // READ
router.get("/application/:applyId", controller.getApplyInfo); // READ (ONE)
router.post("/application/:applyId", controller.postApplyInfo);
router.delete("/application/:applyId", controller.deleteApply);

module.exports = router;
