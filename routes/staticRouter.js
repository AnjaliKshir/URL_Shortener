const express = require('express')

const URL = require("../models/url")

const router = express.Router()

router.get("/", async(req,res) => {
    const allUrls = await URL.find({})
    //we specify the file to be rendered on the frontend
    return res.render("home", {
        //we can also send as many variables as we want to the home.ejs
        urls: allUrls,     
    })  
})

router.get("/signup", (req,res) => {
    return res.render("signup")
})


router.get("/login", (req,res) => {
    return res.render("login")
})

module.exports = router
