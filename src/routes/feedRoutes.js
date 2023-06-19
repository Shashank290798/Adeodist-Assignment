const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRole } = require("../middleware/auth.js");
const feedController = require("../controllers/feedController.js");

// Create a new feed Only accessible by Super Admin
router.post("/createFeed", authenticateUser, authorizeRole(["SuperAdmin"]), feedController.createFeed);

// Update a feed Accessible by Super Admin and Admin
router.put("/updateFeed/:id", authenticateUser, authorizeRole(["SuperAdmin", "Admin"]), feedController.updateFeed);

// Delete a feed Accessible by Super Admin and Admin
router.delete("/deleteFeed/:id", authenticateUser, authorizeRole(["SuperAdmin","Admin"]), feedController.deleteFeed);

// Get a feed by ID Accessible by Super Admin, Admin, and Basic
router.get("/getFeedById/:id", authenticateUser, authorizeRole(["SuperAdmin", "Admin"]), feedController.getFeedById);

// Get all feeds Accessible by Super Admin, Admin, and Basic
router.get("/getAllFeeds", authenticateUser, authorizeRole(["SuperAdmin"]), feedController.getAllFeeds);

module.exports = router;
