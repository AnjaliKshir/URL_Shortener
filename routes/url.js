const express = require('express')
// const URL = require("../models/url")

const {generateNewShortURL, redirectToOriginalURL} = require('../controllers/url')

const router = express.Router()

router.post("/", generateNewShortURL)

router.get("/:shortID", redirectToOriginalURL)

module.exports = router