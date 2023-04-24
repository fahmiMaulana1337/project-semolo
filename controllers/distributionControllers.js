const { Wakaf, Distribution, Fund } = require('../models/index')
const { errResponse, successResponse } = require('../helpers/response')

class DistributionControllers {
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
      return errResponse(500, error, res)
    }
  }

  static async addDistribution(req, res) {
    try {
      const { WakafId, obtained_at } = req.params

      console.log(req.params)

      if (!obtained_at || !WakafId) {
        return errResponse(400, 'All params cannot be null', res)
      }

      //get distribution data
      const getDistribution = await Distribution.findOne({
        where: {
          WakafId,
        },
      })
      console.log(getDistribution, '<<<<<')
      if (!getDistribution) {
        return errResponse(404, 'Distribution not found', res)
      }

      //get fund data
      const getFund = await Fund.findOne({
        where: {
          obtained_at,
        },
      })
      if (!getFund) {
        return errResponse(404, 'Fund not found', res)
      }

      //validate
      if (getDistribution.count > 0) {
        return errResponse(400, 'Limit Distribution', res)
      }

      //update
      getDistribution.count += 1
      getFund.capital -= getDistribution.amount

      await getDistribution.save()
      await getFund.save()

      return successResponse(
        200,
        {
          count: getDistribution.count,
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

module.exports = DistributionControllers
