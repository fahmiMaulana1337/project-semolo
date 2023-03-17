const { hash, compare, encodeToken } = require('../helper/helper');
const { User } = require('../models/index')

class UserController {
    static async register(req, response) {
        try {
            let { email, password } = req.body;
            if(!email||!password){
                throw {name:"Email And Password Required"}
            }
            password= hash(password)
            const user = await User.create({
                email,
                password,
                role:'Admin'
            })
            response.status(201),json(user)
        } catch (error) {
            if(error.name==='Email and Password Required'){
            response.status(400).json(error.name)
            }
            response.status(500).json(error)
        }
    }

    static async login(req,response){
        try {
            const {email,password}=req.body
            if(!email||!password){
                throw {name:"Email And Password Required"}
            }
            const user= await User.findOne({
                where:{
                    email
                }
            })
            if(!user){
                throw {name:'Invalid Login'}
            }
            const check= compare(password,user.password) //true false
            if(!check){
                throw {name:'Invalid Login'}
            }

            let access_token =  encodeToken({email:user.email,role:user.role,name:user.name})

            response.status(200).json({access_token:access_token});

        } catch (error) {
            console.log(error)
            if(error.name==="Invalid Login"){
                response.status(401).json(error.name)
            }else if(error.name ==='Email And Password Required'){
                response.status(400).json(error)
            }else{
                response.status(500).json(error)
            }
        }
    }
}

module.exports = UserController