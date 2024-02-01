const {
  hash,
  compare,
  encodeToken,
  formatType,
  formatSize,
} = require('../helpers/helper')
const { User } = require('../models/index')
const { successResponse, errResponse } = require('../helpers/response')

class AuthControllers {
  //register user
  static async register(req, res) {
    try {
      const { email, password, name, role, address, phoneNumber } = req.body

      const image = req.file

      if (!email || !password) {
        return errResponse(400, 'email password and image must be fields', res)
      }

      if (!image) {
        return errResponse(400, 'img input cannot be null', res)
      }

      const fileType = formatType(image)
      if (fileType) {
        return errResponse(400, fileType, res)
      }
      const fileSize = formatSize(image)
      if (fileSize) {
        return errResponse(400, fileSize, res)
      }

      const imageAdd = image.originalname
      const getUser = await User.findOne({
        where: { email: email },
      })

      if (getUser) {
        return errResponse(400, 'Email already exist', res)
      }

      const hashPassword = hash(password)
      // const uploadImage = image.originalname

      const createUser = {
        email: email,
        password: hashPassword,
        role: role,
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        image: imageAdd,
      }

      await User.create(createUser)
      delete createUser.password

      return successResponse(201, createUser, 'Succesfully registered', res)
    } catch (error) {
      if (error.name === 'Email and Password Required') {
        return errResponse(400, error.name, res)
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        return errResponse(400, 'Email must be unique', res)
      } else {
        return errResponse(500, error, res)
      }
    }
  }

  static async login(req, response) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return errResponse(400, 'Email and Password Required', response)
      }
      const user = await User.findOne({
        where: {
          email,
        },
      })

      if (!user) {
        return errResponse(400, 'Email not registered', response)
      }

      const check = compare(password, user.password) //true false
      if (!check) {
        return errResponse(400, 'Wrong Password', response)
      }
      //email dan pass => true
      let access_token = encodeToken({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      })

      return successResponse(
        202,
        {
          access_token: access_token,
          role: user.role,
          user_id: user.id,
        },
        'Succesfully login',
        response
      )
    } catch (error) {
      console.log(error)
      if (error.name === 'Invalid Login') {
        return errResponse(401, error.name, response)
      } else if (error.name === 'Email And Password Required') {
        return errResponse(400, error, response)
      } else {
        return errResponse(500, error, response)
      }
    }
  }
}

module.exports = AuthControllers
