class BaseController {
  constructor(model) {
    this.model = model
  }

  list = async (req, res, next) => {
    try {
      const data = await this.model.findAll()
      
      res.status(200).json(data)
    } catch (error) {
      next(error)
      // res.status(500).json(error)
    }
  }
}

module.exports = BaseController