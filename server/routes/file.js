const express = require("express");
const router = express.Router();
const controller = require("../controllers/file");

router.get("/", controller.getMyFiles);
router.get("/files/:id", controller.getFile);
router.get("/folders/:id", controller.getFolder);

router.post("/files", controller.createNewFile);
router.post("/folders", controller.createNewFolder);

module.exports = router;
