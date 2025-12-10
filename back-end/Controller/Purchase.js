
const multer = require("multer")
const path = require("path");
const { error } = require("console");
const Purchase = require("../models/Purchase.js");
const Employee = require("../models/Employee.js");



const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,"public/uploads")
    },
    filename :(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname) )
    }
})


const upload = multer({storage:storage})



//// add purchase 

const addPurchase = async(req,res)=>{

try {
    const {
      userId,
      projectname,
      typeofitem,
      shopname,
      purchasedate,
      totalamount,
      billstatus,
      items,
    } = req.body;

    console.log("Received raw items:", items);

    // 🔥 FIX: items string → array
    let parsedItems = items;

    if (typeof items === "string") {
      parsedItems = JSON.parse(items);
    }

     
    console.log("Parsed Items:", parsedItems);

    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    const newPurchase = new Purchase({
      employeeId: employee._id,
      projectname,
      typeofitem,
      shopname,
      purchasedate,
      billstatus,
      totalamount,
      items: parsedItems,  // <-- SAVE ARRAY HERE
      bill: req.file ? req.file.filename : ""
    });

    await newPurchase.save();

    res.status(200).json({
      success: true,
      message: "Purchase added successfully",
      data: newPurchase
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }




    
   
}




//// get purchase 

const getpurchase = async(req,res)=>{
    const{id}=req.params;

    const employee = await Employee.findOne({userId:id})

    console.log(employee._id)


try{

    const purchase = await Purchase.find({employeeId:employee._id}).populate({
      path : 'employeeId',
      populate:[
       
        {
           path : 'userId',
          select : 'name'

        }
      ]
    })
res.status(200).json({success : true , purchase})


}catch(error){


res.status(500).json({success : false , message :" field to get Purchase "})


}



}




/// get purchase for admin


const getAllpurchase = async(req,res)=>{


    try{

    const purchase = await Purchase.find().populate({
      path : 'employeeId',
      populate:[
       
        {
           path : 'userId',
          select : 'name'

        }
      ]
    })
res.status(200).json({success : true , purchase})


}catch(error){


res.status(500).json({success : false , message :" field to get Purchase "})


}




}




/// get purchase Detail

const PurchaseDetail = async(req,res)=>{


    try{
      const {id} = req.params;

    const purchase = await Purchase.findById(id).populate({
      path : 'employeeId',
      populate:[
       
        {
           path : 'userId',
          select : 'name , profileImage'

        }
      ]
    })
res.status(200).json({success : true , purchase})


}catch(error){


res.status(500).json({success : false , message :" field to get Purchase Detail "})


}


}

module.exports = {addPurchase,upload,getpurchase,getAllpurchase,PurchaseDetail}