const express = require('express')
// const URL = require("../models/url")

const {generateNewShortURL, redirectToOriginalURL, getAnalytics} = require('../controllers/url')

const router = express.Router()

router.post("/", generateNewShortURL)

router.get("/:shortId", redirectToOriginalURL)

router.get("/analytics/:shortId", getAnalytics)

module.exports = router