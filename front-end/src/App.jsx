import { Routes,Route,Navigate} from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"

import PrivateRoutes from "./utils/PrivateRoutes"
import RoleBaseRoute from "./utils/RoleBaseRoute"
import AdminSummary from "./components/Dashbord/AdminSummary"

import DepartmentList from "./components/Department/DepartmentList"
import Addepartment from "./components/Department/Addepartment"
import { useState } from "react"
import RefreshHandler from "./Refreshhandler"
import EditDepartment from "./components/Department/EditDepartment"
import List from "./components/empolyee/List"
import Add from "./components/empolyee/Add"
import View from "./components/empolyee/View"
import Edit from "./components/empolyee/Edit"
import Addsalary from "./components/salary/Addsalary"
import Viewsalary from "./components/salary/Viewsalary"

import EmployeeDashbord from "./pages/EmployeeDashbord"
import Summary from "./components/EmployeeDashbord/Summary"
import Profile from "./components/EmployeeDashbord/Profile"
import LeaveList from "./components/Leaves/LeaveList"
import AddLeave from "./components/Leaves/AddLeave"
import Setting from "./components/EmployeeDashbord/Setting"
import Table from "./components/Leaves/Table"
import Details from "./components/Leaves/Details"
import AdminList from "./components/Leaves/AdminList"
import AdminSetting from "./components/EmployeeDashbord/AdminSetting"
import AdminPurchase from "./components/Purchase/AdminPurchase"
import EmployeePurchase from "./components/Purchase/EmployeePurchase"
import EmpAddPurchase from "./components/Purchase/EmpAddPurchase"
import PurchaseDetail from "./components/Purchase/PurchaseDetail"
import PurchaseDetailEmp from "./components/Purchase/PurchaseDetailEmp"
import WorkerList from "./components/workers/WorkerList"
import AddWorker from "./components/workers/AddWorker"

import EditWorker from "./components/workers/EditWorker"
import DeleteWorkerform from "./components/workers/DeleteWorkerform"
import DeleteWorkerList from "./components/workers/DeleteWorkerList"
import DelworkerDetails from "./components/workers/DelworkerDetails"
import Attendence from "./components/attendence/Attendence"
import AttendenceReports from "./components/attendence/AttendenceReports"
import WorkerAttendance from "./components/attendence/WorkerAttendance"
import WorkerAttendanceReport from "./components/attendence/WorkerAttendanceReport"
import AddworkerSalary from "./components/salary/AddworkerSalary"
import Viewworkersalary from "./components/salary/Viewworkersalary"
import MonthlyReports from "./components/attendence/MonthlyReports"
function App() {
   const [isAuthenticated,setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to = '/login'/>
  }


  return (
    <>


<RefreshHandler setIsAuthenticated={setIsAuthenticated}/>

<Routes>
<Route path="/" element={<Navigate to= "login "/>}></Route>
<Route path="/login" element={<Login/>}></Route>


{/* admin  dashbord route  */}

  <Route path ='/admin-dashbord' element={

    <PrivateRoutes>
      <RoleBaseRoute requiredRole={["admin","Employee"]}>
        <AdminDashboard/>

      </RoleBaseRoute>
    </PrivateRoutes>
  }>

  <Route index element={<AdminSummary/>}></Route>
  <Route path="/admin-dashbord/departments" element={<DepartmentList/>}></Route>
  <Route path="/admin-dashbord/add-department" element={<Addepartment/>}></Route>
  <Route path="/admin-dashbord/department/:id" element={<EditDepartment/>}></Route>
      <Route path="/admin-dashbord/employees" element={<List/>}></Route>
      <Route path="/admin-dashbord/add-employees" element={<Add/>}></Route>
      <Route path="/admin-dashbord/employees/:id" element={<View/>}></Route>
      <Route path="/admin-dashbord/employees/edit/:id" element={<Edit/>}></Route>
      <Route path="/admin-dashbord/employees/salary/:id" element={<Viewsalary/>}></Route>  
      <Route path="/admin-dashbord/salary" element={<Addsalary/>}></Route>
        <Route path="/admin-dashbord/leave" element={<Table/>}></Route>
        <Route path="/admin-dashbord/leave/:id" element={<AdminList/>}></Route>
        <Route path="/admin-dashbord/setting" element={<AdminSetting/>}></Route>
       <Route path="/admin-dashbord/leave/detail/:id" element={<Details/>}></Route>
       <Route path="/admin-dashbord/purchase" element={<AdminPurchase/>}></Route>
      <Route path="/admin-dashbord/purchase/detail/:id" element={<PurchaseDetail/>}></Route>
              <Route path="/admin-dashbord/attendance" element={<Attendence/>}></Route>
              <Route path="/admin-dashbord/attendance-reports" element={<AttendenceReports/>}></Route>
      </Route>



{/* employee dashbord  route  */}




<Route path="/employee-dashbord" element={
   <PrivateRoutes>
      <RoleBaseRoute requiredRole={["admin","Employee"]}>
        <EmployeeDashbord/>

      </RoleBaseRoute>
    </PrivateRoutes>
}>
 <Route index element={<Summary/>}></Route>
 <Route path="/employee-dashbord/profile/:id" element={< View/>} />
<Route path="/employee-dashbord/leaves" element={< LeaveList/>} />
<Route path="/employee-dashbord/add-leave" element={< AddLeave/>} />
<Route path="/employee-dashbord/salary/:id" element={< Viewsalary/>} />
<Route path="/employee-dashbord/setting" element={<Setting/>} />
<Route path="/employee-dashbord/purchase" element={<EmployeePurchase/>} />
<Route path="/employee-dashbord/add-purchase" element={<EmpAddPurchase/>} />
<Route path="/employee-dashbord/purchase/detail/:id" element={<PurchaseDetailEmp/>}></Route>
<Route path="/employee-dashbord/workers" element={<WorkerList/>}></Route>
<Route path="/employee-dashbord/add-workers" element={<AddWorker/>}></Route>
<Route path="/employee-dashbord/delete-workers" element={<DeleteWorkerList/>}></Route>
<Route path="/employee-dashbord/worker/edit/:id" element={<EditWorker/>}></Route>
<Route path="/employee-dashbord/worker/deleteform/:id" element={<DeleteWorkerform/>}></Route>
<Route path="/employee-dashbord/delworker/details/:id" element={<DelworkerDetails/>}></Route>
<Route path="/employee-dashbord/workers-attendance" element={<WorkerAttendance/>}></Route>
<Route path="/employee-dashbord/workers-attendance/reports" element={<WorkerAttendanceReport/>}></Route>
<Route path="/employee-dashbord/workers-attendance/reports/monthly" element={<MonthlyReports/>}></Route>
<Route path="/employee-dashbord/add/workersalary" element={<AddworkerSalary/>}></Route>
<Route path="/employee-dashbord/view/workersalary/:id" element={<Viewworkersalary/>}></Route>
</Route>


</Routes>


    </>
  )
}

export default App






{/* <PrivateRoute element={<AdminDashboard/>}/> */}



{/* <Route path="/admin-dashbord" element={

  <PrivateRoutes>
<RoleBaseRoute requiredRole={["admin"]}>
  <AdminDashboard/>
</RoleBaseRoute>
  </PrivateRoutes>
  }>

    <Route index element={<AdminSummary/>}></Route>

  <Route path="/admin-dashbord/departments" element={<DepartmentList/>}></Route>
    <Route path="/admin-dashbord/add-department" element={<Addepartment/>}></Route>

  </Route> */}
