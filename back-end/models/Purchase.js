// const mongoose = require("mongoose")
// const {Schema} = require("mongoose")


// const purchaseSchema = new mongoose.Schema({

    
//      employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },

//     projectname: {
//         type: String,
//         enum: ["Chennai", "Banglore", "Gujrat","Massore"],
//         required: true
//     },

//        typeofitem: {
//         type: String,
//         enum: ["Consumable", "Non-consumable"],
//         required: true
//     },

//     itemname :{
//         type:String,

//     },
//      numberofitem :{
//         type:Number

//     },

//      itemrate :{
//         type:Number,

//     },

//      totalamount :{
//         type:Number,

//     },
//  shopname :{
//         type:String,

//     },
//  purchasedate :{
//         type:String,

//     },
//       bill : {type : String},


//     appliedAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// const Purchase = mongoose.model("Purchase",purchaseSchema);

// module.exports = Purchase;




















const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
    itemname: { type: String },
    numberofitem: { type: Number },
    itemrate: { type: Number },
    gst:{type: Number}
     
});

const purchaseSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },

    projectname: {
        type: String,
        enum: ["Chennai", "Banglore", "Gujrat", "Massore"],
        required: true
    },
      billstatus: {
        type: String,
        enum: ["Request", "Paid", "Un-Paid"],
        required: true
    },


    typeofitem: {
        type: String,
        enum: ["Consumable", "Non-consumable"],
        required: true
    },

    

    shopname: { type: String },
    purchasedate: { type: String },
    totalamount: { type: Number },

    bill: { type: String },
    items: [itemSchema],  // ← IMPORTANT (Array of multiple items)

    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Purchase", purchaseSchema);