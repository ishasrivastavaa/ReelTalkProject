const express = require("express");
const router = express.Router();
const { saveLikes, getUserLikes } = require("../controllers/likes")
const { isAuthenticated } = require("../middleware/auth")

router.post("/save", isAuthenticated, saveLikes)
router.get("/fetch", isAuthenticated, getUserLikes)
module.exports = router;