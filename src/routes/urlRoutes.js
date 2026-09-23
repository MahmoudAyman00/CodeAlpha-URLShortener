const express = require("express");

const router = express.Router();

const {
    createShortUrl,
} = require("../controllers/urlController");

// Create short URL
router.post("/urls", createShortUrl);


module.exports = router;