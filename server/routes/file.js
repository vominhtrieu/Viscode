const express = require("express");
const router = express.Router();
const controller = require("../controllers/file");
const authJwt = require("../middlewares/authJwt");

router.get("/", authJwt.verifyToken, controller.getMyFiles);
router.get("/files/:id", authJwt.verifyToken, controller.getFile);
router.get("/folders/:id", authJwt.verifyToken, controller.getFolder);

router.post("/files", authJwt.verifyToken, controller.createNewFile);
router.post("/folders", authJwt.verifyToken, controller.createNewFolder);

module.exports = router;
