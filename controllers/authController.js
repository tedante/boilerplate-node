const { User } = require("../models/index");
const BaseController = require("./baseController");
const responseHelper = require('../helpers/response')

class AuthController extends BaseController{
  constructor(){
    super(User);
  }

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.model.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw ({
          name: "NOT_FOUND",
          message: "Email not found",
        });
      }

      const validPassword = await user.validPassword(password);

      if (!validPassword) {
        throw ({
          name: "BAD_REQUEST",
          message: "Invalid Password",
        });
      }

      const response = responseHelper.success({
        email: user.email,
        token: user.generateToken()
      }, 'User logged in successfully', 200)

      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  register = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.model.create({
        email,
        password: hash(password),
      });
      const token = user.generateJWT();
      return res.status(201).json({
        message: "User registered successfully",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error: error.message,
      });
    }
  }
}

module.exports = AuthController;