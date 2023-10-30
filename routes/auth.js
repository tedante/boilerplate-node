const router = require("express").Router()
const AuthController = require("../controllers/authController");

const authController = new AuthController();

router.post("/login", authController.login)

module.exports = router;