class Controller {
  static home(req, res, next) {
    res.send("home")
  }
}

module.exports = Controller