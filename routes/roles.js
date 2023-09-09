
const router = require("express").Router()
const RoleController = require("../controllers/roleController");

const roleController = new RoleController();

router.get("/", roleController.list)

module.exports = router;