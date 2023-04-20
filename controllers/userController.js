const {
  hash,
  compare,
  encodeToken,
  formatType,
  formatSize,
} = require("../helpers/helper");
const { User, Asset, Recipe } = require("../models/index");
const midtransClient = require("midtrans-client");
const { sendEmailCheckout } = require("../helpers/send_email");

class UserController {
  static async register(req, response) {
    try {
      const { email, password, name, role, address, phoneNumber } = req.body;
      const image = req.file;
      console.log(image);
      if (!email || !password) {
        throw {
          code: 400,
          message: "Email and password not required",
        };
      }

      if (!image) {
        throw {
          code: 400,
          message: "mantap",
        };
      }

      const fileType = formatType(image);
      if (fileType) {
        throw {
          code: 400,
          message: fileType,
        };
      }
      const fileSize = formatSize(image);
      if (fileSize) {
        throw {
          code: 400,
          message: fileSize,
        };
      }

      const getUser = await User.findOne({
        where: { email: email },
      });

      if (getUser) {
        throw {
          code: 400,
          message: "Email already exists",
        };
      }

      const hashPassword = hash(password);
      const uploadImage = image.originalname;

      const createUser = {
        email: email,
        password: hashPassword,
        role: role,
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        image: uploadImage,
      };

      await User.create(createUser);
      delete createUser.password;

      response.status(201).json({
        code: 201,
        message: "Successfully registered",
        data: createUser,
      });
    } catch (error) {
      if (error.name === "Email and Password Required") {
        response.status(400).json(error.name);
      } else if (error.name === "SequelizeUniqueConstraintError") {
        response.status(400).json({ name: "Email Must Be unique" });
      }
      if (error.name === "Email and Password Required") {
        response.status(400).json(error.name);
      }
      response.status(500).json(error);
    }
  }
  static async login(req, response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Email And Password Required" };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw {
          code: 404,
          message: "Email not registered",
        };
      }
      const check = compare(password, user.password); //true false
      if (!check) {
        throw {
          code: 400,
          message: "Email or password is wrong!",
        };
      }

      let access_token = encodeToken({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      });

      response.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log(error);
      if (error.name === "Invalid Login") {
        response.status(401).json(error.name);
      } else if (error.name === "Email And Password Required") {
        response.status(400).json(error);
      } else {
        response.status(500).json(error);
      }
    }
  }
  static async getAsset(req, response) {
    try {
      const assets = await Asset.findAll({});
      response.status(200).json(assets);
    } catch (error) {
      console.log(error);
      response.statu(500).json(error);
    }
  }
  static async addAsset(req, response) {
    try {
      const { name, address, price, image } = req.body;
      if (!name || !address || !price || !image) {
        throw { name: "required" };
      }
      const asset = await Asset.create({
        name,
        address,
        price,
        image,
        rate: 0,
      });
      response.status(201).json(asset);
    } catch (error) {
      if (error.name === "required") {
        response.status(400).json({ name: "All input must be required" });
      }
      response.status(500).json(error);
    }
  }
  static async requestAsset(req, response) {
    try {
      const { id } = req.params;
      const asset = await Asset.findOne({
        where: {
          id,
        },
      });
      const newAsset = await Recipe.create({
        UserId: req.user.id,
        AssetId: id,
        isActive: "false",
        totalPrice: asset.price,
      });

      response.status(200).json(newAsset);
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }
  static async getRequestAsset(req, response) {
    try {
      const asset = await Recipe.findAll({
        include: [User, Asset],
      });
      response.status(200).json(asset);
    } catch (error) {
      response.status(500).json(error);
    }
  }
  static async acceptRequest(req, response) {
    try {
      const id = req.params.id;

      var now = new Date();
      const deadline = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const asset = await Recipe.update(
        { isActive: "true", deadline: deadline },
        { where: { id: id } }
      );
      response.status(200).json("Accept Request Success!");
    } catch (error) {
      response.status(500).json(error);
    }
  }
  static async payment(req, response) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(req.user.id);
      const recipe = await Recipe.findOne({
        include: [Asset, User],
        where: {
          id,
        },
      });
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-bg1tvPlGrUr4L7wU4FL-iEhA",
      });

      let parameter = {
        transaction_details: {
          order_id:
            "YOUR-ORDERID" + Math.floor(100000 + Math.random() * 9000000),
          gross_amount: recipe.totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      let mail = "fahmimaulana1337@gmail.com";
      sendEmailCheckout(mail);
      response.status(201).json(midtransToken);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
