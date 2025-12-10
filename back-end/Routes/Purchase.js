
const { addPurchase,upload, getpurchase, getAllpurchase, PurchaseDetail } = require('../Controller/Purchase.js');

const router = require('express').Router();


router.post("/add",upload.single("bill"),addPurchase)

router.get("/:id",getpurchase)

router.get("/",getAllpurchase)
router.get("/detail/:id",PurchaseDetail)

module.exports = router