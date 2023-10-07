const { hash, compare } = require("../helpers/bcrypt");
const { User } = require("../models/index");
const BaseController = require("./baseController");

class AuthController extends BaseController{
  constructor(){
    super(User);
  }

  async login(req, res){
    try {
      const { email, password } = req.body;
      const user = await this.model.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(401).json({
          message: "Email not found",
        });
      }
      const validPassword = await user.validPassword(password);
      if (!validPassword) {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }
      const token = user.generateJWT();
      return res.status(200).json({
        message: "User logged in successfully",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error: error.message,
      });
    }
  }

  async register(req, res){
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