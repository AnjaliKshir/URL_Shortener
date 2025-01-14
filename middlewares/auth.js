const {getUser} = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next)
{
    const userUid = req.cookies.uid;

    if(!userUid) return res.redirect("/login");

    const user = getUser(userUid);
    if(!user) return res.redirect("/login");

    //if the user is valid then we store the authenticated user's information in the request object 
    req.user = user;
    next();

}
 
//this function just checks whether any user is logged in or not, it is used to show only those urls that are generated by specific user.
async function checkAuth(req, res, next)
{
    const userUid = req.cookies.uid;

    const user = getUser(userUid);
    
    if(user) req.user = user;
    
    next();
}

module.exports = {restrictToLoggedinUserOnly, checkAuth}

