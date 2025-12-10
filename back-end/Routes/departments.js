

const router = require("express").Router();

const { getDepartment, addDepartment, EditDepartment, geteditDepartment, deleteDepartment } = require("../Controller/departments.js");
const AuthMiddelwere = require("../Middelwere/AuthMiddelwere.js")


router.post("/add",AuthMiddelwere,addDepartment)
router.get("/", getDepartment)
router.get("/:id",geteditDepartment)
router.put("/:id",AuthMiddelwere,EditDepartment)
router.delete("/:id",deleteDepartment)

module.exports = router;