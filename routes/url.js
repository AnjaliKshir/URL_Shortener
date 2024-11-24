const express = require('express')
// const URL = require("../models/url")

const {generateNewShortURL, redirectToOriginalURL, getAnalytics} = require('../controllers/url')

const router = express.Router()

router.post("/", generateNewShortURL)

router.get("/:shortID", redirectToOriginalURL)

router.get("/analytics/:shortID", getAnalytics)

module.exports = router