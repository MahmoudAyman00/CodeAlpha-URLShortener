const { nanoid } = require("nanoid");

const Url = require("../models/urlModel");

// Create short URL
const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url || url.trim() === "" || typeof url !== "string") {
            return res.status(400).json({
                message: "URL is required and must be a non-empty string",
            });
        }

        const shortCode = nanoid(6);

        const newUrl = await Url.create({
            originalUrl: url,
            shortCode: shortCode,
        });

        res.status(201).json({
            message: "Short URL created successfully",
            shortUrl: `http://localhost:${process.env.PORT}/${shortCode}`,
            data: newUrl,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// Redirect to original URL
const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found",
            });
        }

        res.redirect(url.originalUrl);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    createShortUrl,
    redirectToOriginalUrl,
};