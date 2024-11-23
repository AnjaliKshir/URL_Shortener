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
    console.log(typeof(shortID))
    await URL.create({
        shortId: shortID,
        redirectURL: url,
        visitHistory: [],
    })
    

    return res.json({ id: shortID })
    } catch(e){
        console.log("Error: ",e)
        return res.json({error: e})
    }
}

async function redirectToOriginalURL(req,res)
{
    const shortID = req.params.shortID
    const entry = await URL.findOneAndUpdate(
        {//find
            shortID,
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

module.exports = {
    generateNewShortURL,
    redirectToOriginalURL,
}