const { error } = require('../helpers/responseHelper')
const errorHandler = require('../helpers/errorHandler')

module.exports = {
  isLogin: (req, res, next) => {
    if (req.session.isLogin) {
      next()
    } else {
      errorHandler({
        name: 'NOT_AUTHORIZED',
        message: 'You are not authorized'
      }, req, res, next)
    }
  },
  isNotLogin: (req, res, next) => {
    if (!req.session.isLogin) {
      next()
    } else {
      errorHandler({
        name: 'FORBIDDEN',
        message: 'Forbidden'
      }, req, res, next)
    }
  }
}