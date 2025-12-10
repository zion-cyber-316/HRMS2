const { changePassword, changeAdminPassword } = require('../Controller/setting')


const router = require('express').Router()


router.put("/change-password",changePassword)
router.put("/changeAdmin-password",changeAdminPassword)



module.exports = router