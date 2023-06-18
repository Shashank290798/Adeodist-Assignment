const Feed = require("../models/feedModel");

// Create a new feed
exports.createFeed = async (req, res) => {
    try {
        // Extract feed data from request body
        const { name, url, description } = req.body;

        const userId = req.user.id;

        // Create the feed in the database
        const feed = await Feed.create({ name, url, description, userId});

        res.status(201).json({ message: "Feed created successfully", feed });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the feed" });
    }
};

// Update a feed
exports.updateFeed = async (req, res) => {
    try {
        // Extract feed data from request body
        const { name, url, description } = req.body;
        const feedId = req.params.id;
        const userId = req.user.id;

        // Find the feed in the database
        const feed = await Feed.findByPk(feedId);

        if (!feed) {
            return res.status(404).json({ error: "Feed not found" });
        }

        // Update the feed's properties
        feed.name = name;
        feed.url = url;
        feed.description = description;
        feed.userId = userId

        // Save the updated feed in the database
        await feed.save();

        res.status(200).json({ message: "Feed updated successfully", feed });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the feed" });
    }
};

// Delete a feed
exports.deleteFeed = async (req, res) => {
    try {
        const feedId = req.params.id;

        // Find the feed in the database
        const feed = await Feed.findByPk(feedId);

        if (!feed) {
            return res.status(404).json({ error: "Feed not found" });
        }

        // Delete the feed
        await feed.destroy();

        res.status(200).json({ message: "Feed deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the feed" });
    }
};

// Get a feed by ID
exports.getFeedById = async (req, res) => {
    try {
        const feedId = req.params.id;

        // Find the feed in the database
        const feed = await Feed.findByPk(feedId);

        if (!feed) {
            return res.status(404).json({ error: "Feed not found" });
        }

        res.status(200).json({ feed });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the feed" });
    }
};

// Get all feeds
exports.getAllFeeds = async (req, res) => {
    try {
        // Fetch all feeds from the database
        const feeds = await Feed.findAll();

        res.status(200).json({ feeds });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the feeds" });
    }
};
