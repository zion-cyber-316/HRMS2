const { addSalary, getSalary } = require('../Controller/salary')

const router = require('express').Router()


router.post("/add",addSalary)
router.get("/:id",getSalary)


module.exports = router