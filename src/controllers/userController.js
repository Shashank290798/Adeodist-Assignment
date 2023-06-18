const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require('../middleware/auth');
const User = require("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
    try {
        // Extract user data from request body
        const { name, role, email, password } = req.body;

        if (!name || !role || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (role === "SuperAdmin") {
            // Check if a SuperAdmin already exists
            const existingSuperAdmin = await User.findOne({ where: { role: "SuperAdmin" } });

            if (existingSuperAdmin) {
                return res.status(400).json({ message: "SuperAdmin already exists" });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const user = await User.create({ name, role, email, password: hashedPassword });

        const token = generateToken(user.id, user.role);
 

        res
            .status(201)
            .json({ message: "User created successfully", user, token });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
};


// Update a user
exports.updateUser = async (req, res) => {
    try {
        // Extract user data from request body
        const { name, role, email, password } = req.body;

        if (!name || !role || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const userId = req.params.id;

        // Find the user in the database
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the user's properties
        user.name = name;
        user.role = role;
        user.email = email;

        // If a new password is provided, hash it and update the password
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user in the database
        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the user" });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(404).json({ error: "Invalid UserId" });
        }
        // Find the user in the database
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the user
        await user.destroy();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the user" });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(404).json({ error: "Invalid UserId" });
        }

        // Find the user in the database
        const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Successfully retrieved the user", user });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the user" });
    }
};


// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.findAll();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the users" });
    }
};
