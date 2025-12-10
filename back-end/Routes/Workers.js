
const { addWorkers, getworkers, editworker, getOneworker, deleteWorker } = require('../Controller/Worker')



const router = require('express').Router()


router.post("/add",addWorkers)
router.get("/get/:id",getworkers)
router.put("/edit/:id",editworker)
router.get("/getOne/:id",getOneworker)
router.post("/delete/:id",deleteWorker)


module.exports = router