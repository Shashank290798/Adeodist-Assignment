const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRole } = require("../middleware/auth.js");
const { getLogs } = require("../controllers/logController.js");

// Get logs (only accessible by super-admin)
router.get("/getLogs", authenticateUser,authorizeRole(['SuperAdmin']), getLogs);

module.exports = router;
