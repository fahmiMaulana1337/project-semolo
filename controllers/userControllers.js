const { User } = require('../models/index')
const { successResponse, errResponse } = require('../helpers/response')
const { decodeToken, formatSize, formatType } = require('../helpers/helper')

class ProfileControllers {
  static async getAllProfile(req, response) {
    try {
      const data = await User.findAll()
      successResponse(200, data, 'Success get all profile', response)
    } catch (error) {
      return errResponse(500, error, response)
    }
  }

  static async getUserProfile(req, response) {
    try {
      const id = req.params.id
      const data = await User.findOne({
        where: {
          id,
        },
      })

      if (!data) {
        return errResponse(404, 'ID User not found', response)
      }

      return successResponse(200, data, 'Success get profile', response)
    } catch (error) {
      return errResponse(500, error, response)
    }
  }

  static async updateProfile(req, response) {
    try {
      const userId = req.headers.id
      const { name, address, phoneNumber } = req.body

      const inputProfile = await User.findByPk(userId)
      if (!inputProfile) {
        return errResponse(404, 'ID User not found', response)
      }

      inputProfile.name = name
      inputProfile.address = address
      inputProfile.phone_number = phoneNumber

      //updated profile
      inputProfile.updatedAt = new Date()
      inputProfile.save(userId)
      return successResponse(
        200,
        inputProfile,
        'Success update profile',
        response
      )
    } catch (error) {
      return console.log(error)
    }
  }
}

module.exports = ProfileControllers
