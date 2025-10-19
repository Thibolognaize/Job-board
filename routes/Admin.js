const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares/auth");
const controller = require("../controllers/AdminController");

// Index de l'espace admin
router.get("/", isAdmin, controller.get);

// Controller Admin - Companies
router.get("/companies", isAdmin, controller.getCompanies);
router.get("/company/:companyId", isAdmin, controller.getCompanyInfo);
router.post("/company/:companyId", isAdmin, controller.postCompanyInfo);
router.delete("/company/:companyId", isAdmin, controller.deleteCompany);

// Controller Admin - Advertisements
router.get("/advertisements", isAdmin, controller.getAdvertisements);
router.get(
  "/advertisement/:advertisementId",
  isAdmin,
  controller.getAdvertisementInfo
);
router.post(
  "/advertisement/:advertisementId",
  isAdmin,
  controller.postAdvertisementInfo
);
router.delete(
  "/advertisement/:advertisementId",
  controller.deleteAdvertisement,
  isAdmin
);

// Controller Admin - Users
router.post("/user/:userId", isAdmin, controller.postUserInfo); // CREATE
router.get("/users", isAdmin, controller.getUsers); // READ
router.get("/user/:userId", isAdmin, controller.getUserInfo); // UPDATE
router.delete("/user/:userId", isAdmin, controller.deleteUser); // DELETE

// Controller Admin - Applications
router.get("/applications", isAdmin, controller.getApplications); // READ
router.get("/application/:applyId", isAdmin, controller.getApplyInfo); // READ (ONE)
router.post("/application/:applyId", isAdmin, controller.postApplyInfo); // UPDATE
router.delete("/application/:applyId", isAdmin, controller.deleteApply); // DELETE

module.exports = router;
