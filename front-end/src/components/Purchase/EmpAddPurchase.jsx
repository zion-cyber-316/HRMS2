import React, { useEffect, useState } from 'react'
import axios from "axios"

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const EmpAddPurchase = () => {
const [items, setItems] = useState([
    { itemname: "", numberofitem: "", itemrate: "" ,gst:""}
  ]);

  const {user,serverLink}= useAuth()


  const [formData ,setformData] = useState({
     userId :user._id
  })
  const Navigate = useNavigate()



 const addItem = () => {
    setItems([...items, {  itemname: "", numberofitem: "", itemrate: "" ,gst: ""}]);
  };


const deleteItem = () => {

  console.log("delete")
  const copy = [...items];
  copy.pop( );
  setItems(copy);
};


  const handleChange = (e)=>{
    const {name,value,files} =e.target
    if(name == "bill"){
setformData((prevData)=>({...prevData, [name]: files[0]}))
    }else{
      setformData((prevData)=>({...prevData, [name]: value}))
    }
    
   
  }



  const handleChange2 = (index,e)=>{
    const copy = [...items];
    copy[index][e.target.name] = e.target.value;
    setItems(copy);


  }



const handleSubmit = async (e) => {
  e.preventDefault();

 console.log(formData)
 console.log(items)


  const formDataobj = new FormData();


  // Object.keys(formData).forEach((key) => {
  //   formDataobj.append(key, formData[key]);
  //   formDataobj.append("items", JSON.stringify(items));
  // });

formDataobj.append("userId", formData.userId);
formDataobj.append("projectname", formData.projectname);
formDataobj.append("typeofitem", formData.typeofitem);
formDataobj.append("shopname", formData.shopname);
formDataobj.append("purchasedate", formData.purchasedate);
formDataobj.append("totalamount", formData.totalamount);
formDataobj.append("billstatus", formData.billstatus);

// items array → JSON string
formDataobj.append("items", JSON.stringify(items));

// bill file
if (formData.bill) {
  formDataobj.append("bill", formData.bill);
}


  try {
    const response = await axios.post(
      `${serverLink}/api/purchase/add`, 
        formDataobj,
        
      
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

   

    if (response.data.success) {
      Navigate("/employee-dashbord/purchase");
    }
  } catch (error) {
    console.error("❌ Error while adding employee:", error.response?.data);

    // बेहतर error message दिखाओ
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong while adding employee!");
    }
  }
};






  return (
    <div className='max-w-4xl mx-auto mt-2 bg-white p-3 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-2 '>Add New Purchase </h2>
      <form onSubmit={handleSubmit} >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>

            {/* Project Name  */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Project Name 
            </label>
          <select 
          name="projectname" 
          onChange={handleChange}
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Project</option>
            <option value="Chennai">Chennai</option>
            <option value="Banglore">Banglore</option>
            <option value="Massore">Massore</option>
             <option value="Gujrat">Gujrat</option>
          </select>
          </div>

           {/*Type of  Item    */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
               Type of Item 
            </label>
          <select 
          name="typeofitem" 
          onChange={handleChange}
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Select Type</option>
            <option value="Consumable">Consumable</option>
            <option value="Non-consumable">Non-consumable</option>
          
          </select>
          </div>


 {/* Total Amount   */}


          <div>
            <label className='block text-sm font-medium text-gray-700'>
            Total Amount
            </label>
            <input 
            type="number"
            onChange={handleChange}
            name = "totalamount" 
            placeholder='Insert amount'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/>
          </div> 
    

    {/* Shop Name    */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
            Shop Name 
            </label>
            <input 
            type="text"
            onChange={handleChange}
            name = "shopname" 
            placeholder='shop name '
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/>
          </div>

 {/* Date of Purchase */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Date of Purchase
            </label>
            <input 
            type="date"
            onChange={handleChange}
            name = "purchasedate" 
            placeholder='purchase Date '
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required/> 
          </div>

   {/* Bill Upload */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Upload Bill 
            </label>
            <input 
            type="file"
            onChange={handleChange}
            name = "bill" 
            placeholder='upload bill'
            accept='image/*'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            /> 
          </div>
 {/* Bill status  */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Bill Status 
            </label>
          <select 
          name="billstatus" 
          onChange={handleChange}
          className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
           required>
            <option value="">Bill Status</option>
            <option value="Request">Request</option>
            <option value="Paid">Paid</option>
            <option value="Un-Paid">Un-Paid</option>
          
          </select>
          </div>


{/* add items  */}


         {items.map((item, index) => (
  <div key={index} className="border p-3 my-2 rounded-md">

    {/* Item Name */}
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        Item Name
      </label>
      <input 
        type="text"
        name="itemname"
        onChange={(e) => handleChange2(index, e)}
        value={item.itemname}
        placeholder='Insert Name'
        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
        required
      />
    </div>

    {/* Number of Item */}
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        Number of Item
      </label>
      <input 
        type="number"
        name="numberofitem"
        onChange={(e) => handleChange2(index, e)}
        value={item.numberofitem}
        placeholder='Insert Number'
        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
        required
      />
    </div>
     {/* Item Rate */}
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        Item Rate
      </label>
      <input 
        type="number"
        name="itemrate"
        onChange={(e) => handleChange2(index, e)}
        value={item.itemrate}
        placeholder='Insert Rate'
        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
        required
      />
    </div>

      {/* GST */}
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        GST
      </label>
      <input 
        type="number"
        name="gst"
        onChange={(e) => handleChange2(index, e)}
        value={item.gst}
        placeholder='GST%'
        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
        required
      />
    </div>

   
  </div>
))}
          


{/* /* add and delete  butun*/ }

<div>

<div>


   <button type="button" onClick={addItem}
   className='mt-1 p-2 block w-50 border bg-blue-900 text-white border-gray-300 rounded-md'>Add Item</button>

          </div>

          
    {/* DELETE BUTTON */}
  <div>
      <button
      type="button"
      onClick={ deleteItem}
      className="mt-1 p-2 block w-50 border bg-red-900 text-white border-gray-300 rounded-md'"
    >
      Delete Item
    </button>
  </div>


</div>















         




        </div>
        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
          Add Employee

        </button>
      </form>
    </div>
  )
}

export default EmpAddPurchase












