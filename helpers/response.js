const response = (data = {}, message = 'internal server error', code = 500, meta = {}) => {
  return {
    code,
    message,
    data,
    meta
  }
}

module.exports = {
  success: (data = {}, message = 'success', code = 200, meta = {}) => {
    return response(data, message, code, meta)
  },

  error: (data = {}, message, code = 500, meta = {}) => {
    return response(data, message, code, meta)
  },
}