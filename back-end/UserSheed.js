
// const bcrypt = require("bcrypt")
// const User = require("./models/Users.js")




// const registerUser = async()=>{

// const hashPassword = await bcrypt.hash("12345",10)
//     try{
// const newUser = new User({
//     name:"Admin1",
//     email : "admin@gmail.com",
//     password : hashPassword,
//     role :"admin"

// })
// await newUser.save()

//     }catch(err){
//         console.log(err)
//     }
// }





//  registerUser();













const bcrypt = require("bcrypt");
const User = require("./models/Users.js");




  
const registerUser = async () => {
  const hashPassword = await bcrypt.hash("12345", 10);

  try {
    const newUser = new User({
      name: "Admin1",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin"
    });

    await newUser.save();
    console.log("Admin created successfully");

    mongoose.connection.close(); // optional
  } catch (err) {
    console.log(err);
  }
};

registerUser();
