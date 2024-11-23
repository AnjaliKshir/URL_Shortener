const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    //original URL
    redirectURL: {
        type: String, 
        required: true,
    },
    //array of objects to keep track of user clicks
    visitHistory: [{timestamp :{type: Number,}}],
}, {timestamps: true})


const URL = mongoose.model('url', urlSchema)

module.exports =  URL

