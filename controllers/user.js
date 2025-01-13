const User = require("../models/user")
const { setUser } = require("../service/auth")

async function userSignup(req,res)
{
    const {name, email, password} = req.body

    const entry = await User.create({
        name: name,
        email: email,
        password: password,
    })
    
    console.log(entry)
    return res.redirect("/")
}

async function userLogin(req,res)
{
    const {email, password} = req.body

    const user = await User.findOne({email, password})
    
    if(!user) 
        return res.render("login", {error: "Invalid Username or Password😿"})

    const token = setUser(user)
    res.cookie("uid", token)
    return res.redirect("/")
}


module.exports = {
    userSignup, 
    userLogin,
}