const express = require("express");

const router = express.Router();

const {
    redirectToOriginalUrl,
} = require("../controllers/urlController");


// Redirect using short code
router.get("/:shortCode", redirectToOriginalUrl);

module.exports = router;