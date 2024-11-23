require('dotenv').config();

const express = require('express')
const app = express()

const {connectToMongoDB} = require('./connection')

const urlRoute = require('./routes/url')

const PORT = 8000

connectToMongoDB(process.env.MONGO_URL).then(() => console.log("MongoDB Connected!"));

// connectToMongoDB("mongodb://127.0.0.1:27017/DB-URL").then(() => console.log("MongoDB Connected!"))

//middleware to read the request body
app.use(express.json())

app.use("/url", urlRoute)

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))