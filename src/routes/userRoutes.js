const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRole } = require("../middleware/auth");

const userController = require("../controllers/userController");

// Create a new user
router.post("/", userController.createUser);

// Update a user
router.put("/update/:id", authenticateUser, authorizeRole(["Admin"]), userController.updateUser);

// Delete a user
router.delete("/delete/:id", authenticateUser, authorizeRole(["Admin"]), userController.deleteUser);

// Get a user by ID
router.get("/getUser/:id",authenticateUser, authorizeRole(["SuperAdmin","Admin"]), userController.getUserById);

// Get all users
router.get("/allUser", authorizeRole(["Super Admin"]), userController.getAllUsers);

module.exports = router;
