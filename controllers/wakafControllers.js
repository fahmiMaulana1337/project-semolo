const { decodeToken, formatSize, formatType } = require('../middlewares/auth')
const { successResponse, errResponse } = require('../helpers/response')
const { Wakaf, Distribution } = require('../models/index')

class WakafControllers {
  static async registerWakaf(req, res) {
    try {
      const { name, gender, address } = req.body

      console.log(req.body, '<<<<<<<<<<<<<<<')

      //input file from client
      if (!name || !gender || !address) {
        return errResponse(400, 'All input cannot be null', res)
      }

      const newWakaf = await Wakaf.create({
        name,
        gender,
        address,
        status: 'aktif',
      })

      const distributions = await Distribution.create({
        WakafId: newWakaf.id,
        amount: 300000,
      })

      return successResponse(
        201,
        {
          id: distributions.id,
          name: newWakaf.name,
          gender: newWakaf.gender,
          address: newWakaf.address,
          amount: distributions.amount,
        },
        'Successfully register wakaf',
        res
      )
    } catch (error) {
      console.log(error)
      return errResponse(500, error, res)
    }
  }

  static async getAllWakaf(req, response) {
    try {
      const wakafDatas = await Wakaf.findAll()
      return successResponse(
        200,
        wakafDatas,
        'Successfully get all data',
        response
      )
    } catch (error) {
      console.log(error)
      return errResponse(500, error, response)
    }
  }

  static async getWakafById(req, response) {
    try {
      const { id } = req.params

      if (!id) {
        return errResponse(
          400,
          'parameter id cannot be null or undefined',
          response
        )
      }

      const wakafById = await Wakaf.findOne({
        where: {
          id,
        },
      })

      if (!wakafById) {
        return errResponse(404, 'ID Wakaf not found', response)
      }

      successResponse(
        200,
        wakafById,
        'Successfully get wakaf data by id',
        response
      )
    } catch (error) {
      response.status(500).json(error)
    }
  }

  static async updateWakaf(req, res) {
    try {
      const { id } = req.params
      const { name, gender, address, status } = req.body

      if (!id) {
        return errResponse(400, 'parameter id cannot be null or undefined', res)
      }

      if (!name || !gender || !address || !status) {
        return errResponse(400, 'All input cannot be null', res)
      }

      const updateWakaf = await Wakaf.findByPk(id)

      if (!updateWakaf) {
        return errResponse(404, 'ID Wakaf not found', res)
      }

      //update wakaf

      updateWakaf.name = name
      updateWakaf.gender = gender
      updateWakaf.address = address
      updateWakaf.status = status
      updateWakaf.updateAt = new Date()
      updateWakaf.save(id)

      return successResponse(
        200,
        updateWakaf.toJSON(),
        'Successfully update wakaf data',
        res
      )
    } catch (error) {
      console.log(error)
      return errResponse(500, error, res)
    }
  }
}

module.exports = WakafControllers
