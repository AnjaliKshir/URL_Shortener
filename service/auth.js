const jwt = require("jsonwebtoken")
const secret = "$ShOrT$"

//this function will make tokens for particular users
function setUser(user)
{
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
         secret)
}

function getUser(token)
{
    if(!token) return null;
    try {
        return jwt.verify(token, secret); //returns the decoded token payload i.e. an object -->{id:123, email:abc@gmail.com}
    } catch (error) {
        return null;
    }
}

module.exports = {setUser, getUser}