const mongoose = require("mongoose");

const database = async()=>{
    try{
        mongoose.connect(process.env.DB_URL)
.then(()=>{console.log("conected database")})
    }catch(err){
        console.log(err)
    }
}





module.exports = database;