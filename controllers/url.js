// const shortid = require('shortid')
const {nanoid} = require('nanoid')
const URL = require("../models/url")

async function generateNewShortURL(req, res)
{ 
    try{
    const {url} = req.body
    if(!url) return res.status(400).json({error: 'url is required!'})
 
    // const shortID = shortid() //returns a string
    const shortID = nanoid(8)
    console.log(shortID)
    
    await URL.create({
        shortId: shortID,
        redirectURL: url,
        visitHistory: [],
        createdBy: req.user._id,    // this is taken from the middleware --> req.user = user
    })
    
    return res.render("home", {
        id: shortID,
    })

    } catch(e){
        console.log("Error: ",e)
        return res.json({error: e})
    }
}

async function redirectToOriginalURL(req,res)
{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {//find
            shortId,
        },
        {//update the visitHistory by appending the timestamp to the array
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    )
    if (!entry) {
        return res.status(404).json({error: "ShortID not found"});
    }
    res.redirect(entry.redirectURL)
}

async function getAnalytics(req, res)
{
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}

module.exports = {
    generateNewShortURL,
    redirectToOriginalURL,
    getAnalytics,
}