const { getdeleteworkers, getworker } = require("../Controller/deleteworker")

const router = require("express").Router()



router.get("/get",getdeleteworkers)
router.get("/details/:id",getworker)

module.exports = router