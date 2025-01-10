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
//URL is a Mongoose model created using the urlSchema. The 'url' parameter specifies the name of the MongoDB collection, which Mongoose will automatically convert to lowercase and pluralize (as urls). This model allows us to perform CRUD operations on the urls collection in the database.

module.exports =  URL

