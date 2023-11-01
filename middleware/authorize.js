const errorHandler = require('../helpers/errorHandler')

const getBearerToken = (headers) => {
  const bearerHeader = headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]

    return bearerToken
  } else {
    return null
  }
}

module.exports = {
  isLogin: (req, res, next) => {
    let token = getBearerToken(req.headers)
    if (token) {
      req.token = token
      next()
    } else {
      errorHandler({
        name: 'NOT_AUTHORIZED',
        message: 'You are not authorized'
      }, req, res, next)
    }
  },
  isNotLogin: (req, res, next) => {
    let token = getBearerToken(req.headers)
    if (!token) {
      req.token = token
      next()
    } else {
      errorHandler({
        name: 'FORBIDDEN',
        message: 'Forbidden'
      }, req, res, next)
    }
  }
}