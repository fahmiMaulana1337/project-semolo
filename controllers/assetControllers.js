const { decodeToken, formatSize, formatType } = require('../helpers/helper')
const { successResponse, errResponse } = require('../helpers/response')
const { User, Asset, Recipe } = require('../models')

class AssetControllers {
  static async detailAsset(req, response) {
    try {
      const id = req.params.id
      const data = await Asset.findOne({
        include: [{ model: User }, { model: Recipe }],
        where: {
          id,
        },
      })
      return successResponse(200, data, 'Success get asset', response)
    } catch (error) {
      console.log(error)
    }
  }
  static async registerAsset(req, res) {
    try {
      //decode token and get id
      const user_id = req.user.id
      //input file from outside
      const { name, address, price } = req.body
      const image = req.file

      //query find user byprimary key

      if (!name || !address || !price || !image) {
        return errResponse(400, 'All input cannot be null', res)
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
      const inputAssets = {
        user_id: user_id,
        name: name,
        address: address,
        price: price,
        image: imageAdd,
        rank: 0,
      }
      //register asset
      await Asset.create(inputAssets)

      return successResponse(201, inputAssets, 'Succesfully add assets', res)
    } catch (error) {
      console.log(error)
      if (error.name === 'required') {
        return errResponse(400, error, res)
      }
      return errResponse(500, error, res)
    }
  }

  static async getAllAsset(req, response) {
    try {
      const assets = await Asset.findAll({
        include: User,
      })
      return successResponse(200, assets, 'Successfully get datas', response)
    } catch (error) {
      return errResponse(500, error, response)
    }
  }

  static async getUserAsset(req, response) {
    try {
      //decode token and get id
      let access_token = req.headers
      let id = req.params.id

      const getAsset = await Asset.findAll({
        include: [{ model: User }, { model: Recipe }],
        where: {
          UserId: id,
        },
      })

      if (!getAsset || !id) {
        return errResponse(400, 'User not found')
      }

      if (getAsset.length === 0) {
        return errResponse(400, 'User dont have asset', response)
      }

      return successResponse(
        200,
        getAsset,
        'Succesffully show user aset',
        response
      )
    } catch (error) {
      console.log(error)
      return errResponse(500, 'server error', response)
    }
  }

  static async requestAsset(req, response) {
    try {
      const { id } = req.params
      const asset = await Asset.findOne({
        where: {
          id,
        },
      })
      if (!asset) {
        return errResponse(404, 'Assets not found', response)
      }

      const alreadyReq = await Recipe.findOne({
        where: {
          AssetId: asset.id,
        },
      })

      if (alreadyReq) {
        return errResponse(
          400,
          'Data Already requested, waiting admin for accepeted',
          response
        )
      }

      const newReqAsset = await Recipe.create({
        user_id: req.user.id,
        asset_id: id,
        is_active: 'waiting',
        total_price: asset.price,
      })

      return successResponse(
        200,
        newReqAsset,
        'Sucessfully request asset to admin',
        response
      )
    } catch (error) {
      console.log(error)
      return errResponse(500, error, response)
    }
  }

  //admin role
  static async getRequestAsset(req, response) {
    try {
      const asset = await Recipe.findAll({
        // include: [User, Asset],
        where: {
          is_active: 'waiting',
        },
      })

      if (!asset[0]) {
        return errResponse(404, 'Asset not found', response)
      }

      return successResponse(
        200,
        asset,
        'Success get all request asset',
        response
      )
    } catch (error) {
      return errResponse(500, error, response)
    }
  }
  static async acceptRequest(req, response) {
    try {
      const id = req.params.id

      const now = new Date()
      const deadline = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const getAsset = await Recipe.findOne({
        where: {
          asset_id: id,
        },
      })

      if (!getAsset) {
        return errResponse(404, 'Asset ID not found', response)
      } else if (getAsset.is_active === 'true') {
        return errResponse(200, 'Asset already accepted', response)
      } else if (getAsset.is_active === 'false') {
        return errResponse(200, 'Asset already rejected', response)
      }

      //udpate
      getAsset.is_active = true
      getAsset.deadline = deadline
      await getAsset.save()

      return successResponse(
        200,
        getAsset,
        'Accept Request status changed to true',
        response
      )
    } catch (error) {
      console.log(error)
      response.status(500).json(error)
    }
  }
}

module.exports = AssetControllers
