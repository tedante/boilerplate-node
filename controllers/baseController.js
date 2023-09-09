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

  create = async (req, res, next) => {
    try {
      const data = await this.model.create(req.body)

      let responseSuccess = responseHelper.success(data, 'Data successfully created', 201)

      res.status(responseSuccess.code).json(responseSuccess)
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res, next) => {
    try {
      const data = await this.model.update(req.body, {
        where: {
          id: req.params.id
        }
      })

      let responseSuccess = responseHelper.success(data, 'Data successfully updated', 200)

      res.status(responseSuccess.code).json(responseSuccess)
    } catch (error) {
      next(error)
    }
  }

  destroy = async (req, res, next) => {
    try {
      const data = await this.model.destroy({
        where: {
          id: req.params.id
        }
      })

      let responseSuccess = responseHelper.success(data, 'Data successfully removed', 204)

      res.status(responseSuccess.code).json(responseSuccess)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BaseController