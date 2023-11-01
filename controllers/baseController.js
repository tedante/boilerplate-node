const responseHelper = require('../helpers/response')
const paginate = require('../helpers/paginate')
const { Op } = require('sequelize')

class BaseController {
  constructor(model) {
    this.model = model
  }

  get filterable() {
    return []
  }

  get sortable() {
    return []
  }

  get include() {
    return []
  }

  list = async (req, res, next) => {
    let { page, limit, filter, orderby, ordertype } = req.query

    try {
      let params = {
        order: this.getOrder(orderby, ordertype),
        where: this.getFilter(filter)
      }

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

  getFilter = (filter) => {
    let sequelizeFilter = {}

    console.log(this.filterable, ">");

    if (filter) {
      for (const key in filter) {
        if(this.filterable.includes(key)) {
          sequelizeFilter[key] = {
            [Op.iLike]: `%${filter[key]}%`
          }
        }        
      } 
    }

    return sequelizeFilter
  }

  getOrder = (orderby, ordertype) => {
    let order = []

    if (orderby && ordertype) {
      if(this.sortable.includes(orderby)) {
        order.push([orderby, ordertype])
      }
    } else {
      order.push(['updatedAt', 'DESC'])
    }

    return order
  }
}

module.exports = BaseController