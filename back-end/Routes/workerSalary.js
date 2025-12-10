const { addworkerSalary, findsalary } = require("../Controller/WorkerSalary");

const router = require("express").Router()


router.post("/add",addworkerSalary)
router.get("/find/:id",findsalary)



module.exports = router;