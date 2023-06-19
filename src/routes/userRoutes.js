const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRole } = require("../middleware/auth");

const userController = require("../controllers/userController");

// Create a new user
router.post("/", authenticateUser, authorizeRole(["SuperAdmin"]), userController.createUser);

// Update a user
router.put("/update/:id", authenticateUser, authorizeRole(["SuperAdmin"]), userController.updateUser);

// Delete a user
router.delete("/delete/:id", authenticateUser, authorizeRole(["SuperAdmin"]), userController.deleteUser);

// Get a user by ID Accessible by Super Admin, Admin
router.get("/getUser/:id", authenticateUser, authorizeRole(["SuperAdmin", "Admin"]), userController.getUserById);

// Get all users
router.get("/allUser", authorizeRole(["Super Admin"]), userController.getAllUsers);

module.exports = router;
