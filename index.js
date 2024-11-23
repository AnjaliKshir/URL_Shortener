const express = require('express')
const app = express()

const {connectToMongoDB} = require('./connection')

const urlRoute = require('./routes/url')

const PORT = 8000

connectToMongoDB("mongodb://127.0.0.1:27017/DB-URL").then(() => console.log("MongoDB Connected!"))

app.use("/url", urlRoute)

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))