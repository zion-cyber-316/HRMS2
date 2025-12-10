const { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeeByDepId, fetchEmployeeByuserId } = require('../Controller/employee')


const router = require('express').Router()


router.post("/add",upload.single("image"),addEmployee)
router.get("/",getEmployees)

router.get("/:id",getEmployee)

router.put("/edit/:id",updateEmployee)

router.get("/department/:id",fetchEmployeeByDepId)
router.get("/userId/:id",fetchEmployeeByuserId)

module.exports = router