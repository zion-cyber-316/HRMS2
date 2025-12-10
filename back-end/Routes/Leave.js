const { addLeave, getLeaves, getLeave, getLeaveDetail, updateLeave, getadminLeaves } = require("../Controller/leaveController")

const router = require("express").Router()


router.post("/add",addLeave)
router.get("/:id",getLeaves)
router.get("/",getLeave)
router.get("/detail/:id",getLeaveDetail)
router.put("/:id",updateLeave)

router.get("/admin/:id",getadminLeaves)

module.exports = router