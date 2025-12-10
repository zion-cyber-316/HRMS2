
const { login, signup,verify } = require("../Controller/AuthController");
const AuthMiddelwere = require("../Middelwere/AuthMiddelwere.js")

const router = require("express").Router();

router.get("/get",(req,res)=>{
    res.send("hiiii");
    console.log("hhhh")
})

router.post("/login",login)

router.post("/signup",signup)

router.get("/verify",AuthMiddelwere,verify)


module.exports = router;