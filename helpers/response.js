const successResponse = (code, data, msg, res) => {
  res.status(code).json({
    status: code,
    message: msg,
    datas: data,
  })
}
const errResponse = (code, msg, res) => {
  res.status(code).json({
    status: code,
    message: msg,
  })
}

module.exports = {
  successResponse,
  errResponse,
}
