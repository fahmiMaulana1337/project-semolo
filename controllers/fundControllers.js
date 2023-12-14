  const { Wakaf, Fund } = require('../models/index')
const { errResponse, successResponse } = require('../helpers/response')
const { Op, ValidationErrorItemType } = require('sequelize')

class FundControllers {
  static async registerFund(req, res) {
    try {
      const { obtained_at, capital } = req.body

      if (!capital || !obtained_at) {
        return errResponse(400, 'All input cannot be null', res)
      }

      const newFund = await Fund.create({
        capital,
        obtained_at,
      })

      return successResponse(201, newFund, 'Successfully register fund', res)
    } catch (error) {
      console.log('ERROR=>', error)
      return errResponse(500, error, res)
    }
  }

  static async getAllWakafStatus(req, res) {
    try {
      const { year } = req.params

      console.log(year)

      const fund = await Fund.findOne({
        where: {
          obtained_at: year,
        },
      })

      const id = fund.id
      const fundIdString = id.toString()
      const wakafs = await Wakaf.findAll({
        where: {
          status: {
            [Op.or]: {
              [Op.ne]: fundIdString,
              [Op.eq]: null,
            },
          },
        },
      })

      console.table(wakafs)

      return successResponse(200, wakafs, 'Successfully get all data', res)
    } catch (error) {
      console.log(error)
      return errResponse(500, error, res)
    }
  }

  static async updateDistribution(req, res) {
    try {
      const { wakaf_id, obtained_at } = req.body

      if (!obtained_at || !wakaf_id) {
        return errResponse(400, 'All params cannot be null', res)
      }

      
      const getFund = await Fund.findOne({
        where: {
          obtained_at: obtained_at,
        },
      })

      if (!getFund) {
        return errResponse(404, 'wrong year not found in db', res)
      }

      const id = getFund.id
      const fundIdString = id.toString()
      const wakafs = await Wakaf.findOne({
        where: {
          id: wakaf_id,
          status: {
            [Op.or]: {
              [Op.ne]: fundIdString,
              [Op.eq]: null,
            },
          },
        },
      })
      if (!wakafs) {
        return errResponse(
          404,
          'User already received  wakaf in this year',
          res
        )
      }

      //update
      wakafs.status += 1
      getFund.capital -= wakafs.amount
      await wakafs.save()

      return successResponse(
        200,
        {
          count: wakafs.status,
          'sisa total dana': getFund.capital,
        },
        'Successfully updated distribution ',
        res
      )
    } catch (error) {
      console.log(error)
      errResponse(500, error, res)
    }
  }
}

module.exports = FundControllers
