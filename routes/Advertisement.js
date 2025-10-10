const express = require("express");
const router = express.Router();

const controller = require("../controllers/AdvertisementController");

router.get("/", controller.get);
router.post("/", controller.post);
router.get("/create", controller.getCreateAdvertisement);

module.exports = router;