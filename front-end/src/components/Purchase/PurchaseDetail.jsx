import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const PurchaseDetail = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const {serverLink} = useAuth()

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await axios.get(
          `${serverLink}/api/purchase/detail/${id}`
        );
        if (response.data.success) {
          console.log(response.data)
          setPurchase(response.data.purchase);
        }
      } catch (error) {
        console.error(error);
        alert('Failed to fetch purchase details');
      }
    };
    fetchPurchase();
  }, [id]);

  // Bill image download function
  const downloadBillImage = () => {
    if (!purchase?.bill) return;

    const link = document.createElement('a');
    link.href = `${serverLink}/${purchase.bill}`; // bill URL
    link.download = `Bill_${purchase._id}.jpg`; // file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {purchase ? (
        <div className="max-w-4xl mx-auto mt-3 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Purchase Detail</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bill Image */}
            <div>
              {purchase.bill && (
                <div>
                  <img
                    src={`${serverLink}/${purchase.bill}`}
                    className="border w-72"
                    alt="Bill"
                  />
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
                    onClick={downloadBillImage}
                  >
                    Download Bill
                  </button>
                </div>
              )}
            </div>

            {/* Purchase Info */}
            <div>
                   <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Bill Status :</p>
                <p className="font-medium">{purchase.billstatus}</p>
              </div>
              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Employee Name:</p>
                <p className="font-medium">{purchase.employeeId.userId.name}</p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Project Name:</p>
                <p className="font-medium">{purchase.projectname}</p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Type Of Item:</p>
                <p className="font-medium">{purchase.typeofitem}</p>
              </div>

              <div className="mb-2">
                <p className="text-lg font-bold">Items Details:</p>
                <ul className="ml-4 list-disc">
                  {purchase.items.map((item, index) => (
                    <li key={index}>
                      <b>Name of Item</b>: {item.itemname},{' '}
                      <b>Number of Item</b>: {item.numberofitem},{' '}
                      <b>Rate</b>: {item.itemrate},{' '}
                     
                      <b>Total</b>: {item.numberofitem * item.itemrate}{' '}
                       <b>GST</b>: {`${item.gst}%`},{' '}
                      <b>Total with GST</b>: { (item.numberofitem * item.itemrate) +
  (item.numberofitem * item.itemrate * item.gst) / 100}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Total Amount:</p>
                <p className="font-medium">{purchase.totalamount}</p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Shop Name:</p>
                <p className="font-medium">{purchase.shopname}</p>
              </div>

              <div className="flex space-x-3 mb-2">
                <p className="text-lg font-bold">Purchase Date:</p>
                <p className="font-medium">
                  {new Date(purchase.purchasedate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default PurchaseDetail;



























// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const PurchaseDetail = () => {
//   const { id } = useParams();
//   const [purchase, setPurchase] = useState(null);

//   useEffect(() => {
//     const fetchPurchase = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/purchase/detail/${id}`
//         );
//         if (response.data.success) {
//           setPurchase(response.data.purchase);
//         }
//       } catch (error) {
//         console.error(error);
//         alert('Failed to fetch purchase details');
//       }
//     };
//     fetchPurchase();
//   }, [id]);

//   return (
//     <>
//       {purchase ? (
//         <div className="max-w-4xl mx-auto mt-3 bg-white p-8 rounded-md shadow-md">
//           <h2 className="text-3xl font-bold mb-8 text-center">Purchase Detail</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Bill Image */}
//             <div>
//               {purchase.bill && (
//                 <img
//                   src={`http://localhost:5000/${purchase.bill}`}
//                   className="border w-72"
//                   alt="Bill"
//                 />
//               )}
//             </div>

//             {/* Purchase Info */}
//             <div>
//               <div className="flex space-x-3 mb-2">
//                 <p className="text-lg font-bold">Employee Name:</p>
//                 <p className="font-medium">{purchase.employeeId.userId.name}</p>
//               </div>

//               <div className="flex space-x-3 mb-2">
//                 <p className="text-lg font-bold">Project Name:</p>
//                 <p className="font-medium">{purchase.projectname}</p>
//               </div>

//               <div className="flex space-x-3 mb-2">
//                 <p className="text-lg font-bold">Type Of Item:</p>
//                 <p className="font-medium">{purchase.typeofitem}</p>
//               </div>

//               <div className="mb-2">
//                 <p className="text-lg font-bold">Items Details:</p>
//                 <ul className="ml-4 list-disc">
//                   {purchase.items.map((item, index) => (
//                     <li key={index}>
//                      <b>Name of Item</b>: {item.itemname}, <b>Number of Item</b>: {item.numberofitem}, <b>Rate</b>: {item.itemrate}, <b>Total</b>:{' '}
//                       {item.numberofitem * item.itemrate}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="flex space-x-3 mb-2">
//                 <p className="text-lg font-bold">Total Amount:</p>
//                 <p className="font-medium">{purchase.totalamount}</p>
//               </div>

//               <div className="flex space-x-3 mb-2">
//                 <p className="text-lg font-bold">Shop Name:</p>
//                 <p className="font-medium">{purchase.shopname}</p>
//               </div>

//               <div className="flex space-x-3 mb-2">
//                 <p className="text-lg font-bold">Purchase Date:</p>
//                 <p className="font-medium">
//                   {new Date(purchase.purchasedate).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </>
//   );
// };

// export default PurchaseDetail;































































// import React, { useEffect, useState } from 'react'
// import {  useParams } from 'react-router-dom'
// import axios from 'axios';




// const PurchaseDetail = () => {
//     const {id} = useParams();
//     const [Purchase,setPurchase] = useState(null)




//     useEffect(()=>{
//   const fetchPurchase = async()=>{
//     try{
//       const response = await axios.get(`http://localhost:5000/api/purchase/detail/${id}`)
//       console.log(response.data.purchase)
//       if(response.data.success){
//         setPurchase(response.data.purchase)
        
//       }

//     }catch(error){
//       if(error.response && !error.response.data.success){
//         alert(error.response)
//       }
//     }
//   }
//   fetchPurchase()

  
// },[id])



//   return ( 
// <>  {Purchase ? (
//     <div className='max-w-3xl mx-auto mt-3 bg-white p-6 rounded-md shadow-md'>
//     <h2 className='text-3xl font-bold mb-8 text-center'>
//     Purchase Detail
//     </h2>
//     <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//         <div>
//             <img src={`http://localhost:5000/${Purchase.bill}`}
//             className=' border w-72' />
//         </div>
// <div>
//     <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'>Name :</p>
//         <p className='font-medium'>{Purchase.employeeId.userId.name}</p>

//     </div>
//     <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'>Employee ID :</p>
//         <p className='font-medium'>{Purchase.employeeId.employeeId}</p>

//     </div>
//     <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'>Project Name:</p>
//         <p className='font-medium'>{Purchase.projectname}</p>

//     </div>
//     <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'> Type Of Item :</p>
//         <p className='font-medium'>{Purchase.typeofitem}</p>

//     </div>


//     <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'> Item Name :</p>
//         <p className='font-medium'>{Purchase.itemname}</p>

//     </div>

//       <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'> Number of Item :</p>
//         <p className='font-medium'>{Purchase.numberofitem}</p>

//     </div>

//         <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'> Item Rate :</p>
//         <p className='font-medium'>{Purchase.itemrate}</p>

//     </div>
//         <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'> Total Amount :</p>
//         <p className='font-medium'>{Purchase.totalamount}</p>

//     </div>

//         <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'> Shop Name :</p>
//         <p className='font-medium'>{Purchase.shopname}</p>

//     </div>


//     <div className='flex space-x-3 mb-2'>
//         <p className='text-lg font-bold'>Purchase Date :</p>
//         <p className='font-medium'>{new Date(Purchase.purchasedate).toLocaleDateString()}</p>

//     </div>
  



    



// </div>
// </div>

// </div>
// ): <div>Loading</div>}


// </>

//   )
// }

// export default PurchaseDetail

