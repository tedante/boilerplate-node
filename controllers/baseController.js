const responseHelper = require('../helpers/response')
const paginate = require('../helpers/paginate')

class BaseController {
  constructor(model) {
    this.model = model
  }

  list = async (req, res, next) => {
    let { page, limit, filter, orderby, ordertype } = req.query

    let params = {
      order: this.getOrder(orderby, ordertype)
    }

    try {
      const data = await paginate(this.model, page, limit, params)
      
      let responseSuccess = responseHelper.success(data.data, 'Data successfully retrieved', 200, data.meta)
      
      res.status(responseSuccess.code).json(responseSuccess)
    } catch (error) {
      console.log(error);
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

  // get query string filter and return sequelize filter
  getFilter = (filter) => {
    let sequelizeFilter = {}

    if (filter) {
      let filterArray = filter.split(',')

      filterArray.forEach((item) => {
        let filterItem = item.split(':')

        sequelizeFilter[filterItem[0]] = filterItem[1]
      })
    }

    return sequelizeFilter
  }

  getOrder = (orderby, ordertype) => {
    let order = []

    if (orderby && ordertype) {
      order.push([orderby, ordertype])
    }

    return order
  }
}

module.exports = BaseController