import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (userId , res) =>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET,{
        expiresIn : '30d'
    })
    res.cookie("jwt" , token , {
        maxAge : 15 * 24 * 60 * 60 * 1000,
        httpOnly : true, //prevent xxs attacks (cross-site scripting attacks)
        sameSite:"strict", //CSRF attacks cross-site attacks request forgery attacks
        secure : process.env.NODE_ENV !== "development",
    })
}

export default generateTokenandSetCookie;