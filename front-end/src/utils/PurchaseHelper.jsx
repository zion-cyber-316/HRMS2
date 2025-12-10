import { useNavigate } from "react-router-dom"


export const columns = [
    {
        name :" S no",
        selector :(row) => row.sno,
        width : "60px"
    },
     {
        name :"Emp ID",
        selector :(row) => row.employeeId,
        width : "110px"
    },
     {
        name :"Name",
        selector :(row) => row.name,
        width : "160px"
    },
     {
        name :"Project-name",
        selector :(row) => row.project,
        width : "140px"
    },
     {
        name :"Item-type",
        selector :(row) => row.itemType,
        width : "170px"
    },
   
     {
        name :"total-amount",
        selector :(row) => row.Amount,
        width : "120px"
    },
  {
        name :"Date",
        selector :(row) => row.Date,
        width : "120px"
    },

     {
        name :" Action",
        selector :(row) => row.action,
         style: { textAlign: "center" }
    }
]




export const PurchasButtons = ({ Id})=>{
    const navigate = useNavigate();
    const handleView = (id) =>{
        navigate(`/admin-dashbord/purchase/detail/${id}`)
    }

    return(
        <button 
        className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
        onClick={()=>handleView(Id)}
        >
            View
        </button>
    )
}