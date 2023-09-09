const responseHelper = require('../helpers/response')

class BaseController {
  constructor(model) {
    this.model = model
  }

  list = async (req, res, next) => {
    try {
      const data = await this.model.findAll()

      let responseSuccess = responseHelper.success(data)

      res.status(responseSuccess.code).json(responseSuccess)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BaseController