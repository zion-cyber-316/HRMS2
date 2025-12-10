const { getSummary } = require("../Controller/dashbord");

const router = require("express").Router();



router.get("/summary",getSummary)



module.exports = router



