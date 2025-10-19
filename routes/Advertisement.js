const express = require("express");
const router = express.Router();

const { isCompany } = require("../middlewares/auth");
const controller = require("../controllers/AdvertisementController");
// Read
router.get("/", controller.getAll);
router.get("/:id/json", controller.getAdvertisementJson);

router.get("/:id/apply", controller.getApply);
router.post("/:id/apply", controller.postApply);

// Create
router.post("/", isCompany, controller.post);
router.get("/create", isCompany, controller.createAdvertisement);

module.exports = router;
