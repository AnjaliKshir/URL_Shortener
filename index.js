require('dotenv').config();

const path = require("path") //in built module required for viewing the loc of ejs files


const express = require('express')
const app = express()

const {connectToMongoDB} = require('./connection')

const urlRoute = require('./routes/url')
const staticRoute = require("./routes/staticRouter")
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth")


const PORT = 8000

connectToMongoDB(process.env.MONGO_URL).then(() => console.log("MongoDB Connected!"));

// connectToMongoDB("mongodb://127.0.0.1:27017/DB-URL").then(() => console.log("MongoDB Connected!"))

//set the view engine for server side rendering
app.set("view engine", "ejs")
app.set("views", path.resolve("./views")) // this tells the path of where the .ejs files are located.

//middleware to read the request body, to support json data
app.use(express.json())
//middleware to support form data
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use("/url", restrictToLoggedinUserOnly, urlRoute)
app.use("/", checkAuth, staticRoute)
app.use("/user", userRoute)

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))