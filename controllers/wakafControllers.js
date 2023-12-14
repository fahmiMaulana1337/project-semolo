const { decodeToken, formatSize, formatType } = require('../middlewares/auth')
const { successResponse, errResponse } = require('../helpers/response')
const { Wakaf, Fund } = require('../models/index')

class WakafControllers {
  static async registerWakaf(req, res) {
    try {
      const { name, gender, address, nowYear, amount, fund_id } = req.body

      console.log('1. 1. MASOKOKOKOKO===>', req.body)
      //input file from client
      if (!name || !gender || !address || !nowYear || !amount || !fund_id) {
        return errResponse(400, 'All input cannot be null', res)
      }

      const newWakaf = await Wakaf.create({
        name,
        gender,
        address,
        is_active: 'aktif',
        amount,
        fund_id,
      })

      return successResponse(
        201,
        {
          id: newWakaf.id,
          name: newWakaf.name,
          gender: newWakaf.gender,
          address: newWakaf.address,
          amount: newWakaf.amount,
          is_active: newWakaf.is_active,
          status: newWakaf.status,
        },  
        'Successfully register wakaf',
        res
      )
    } catch (error) {
      console.log(error)
      return errResponse(500, error.name, res)
    }
  }

  static async getAllWakaf(req, response) {       
    try {
      const wakafDatas = await Wakaf.findAll({
        include: Fund,
      })
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
      const { name, gender, address } = req.body

      if (!id) {
        return errResponse(400, 'parameter id cannot be null or undefined', res)
      }
      if (!name || !gender || !address) {
        return errResponse(400, 'All input cannot be null', res)
      } 
      //update wakaf
      const wakafs = await Wakaf.findByPk(id)
      if (!wakafs) {
        return errResponse(404, 'ID Wakaf not found', res)
      }

      wakafs.name = name
      wakafs.gender = gender
      wakafs.address = address
      // wakafs.status = status
      wakafs.updateAt = new Date()
      wakafs.save(id)

      return successResponse(200, wakafs, 'Successfully update wakaf data', res)
    } catch (error) {
      console.log(error)
      return errResponse(500, error, res)
    }
  }
}

module.exports = WakafControllers
