const { hash, compare, encodeToken } = require('../helpers/helper');
const { User, Asset, Recipe, Wakaf } = require('../models/index')
const midtransClient = require('midtrans-client');
const { sendEmailCheckout } = require('../helpers/send_email');
const wakaf = require('../models/wakaf');
const { where } = require('sequelize');
const distribution = require('../models/distribution');

class adminController{
static async acceptRequest(req, response) {
        try {
            const id = req.params.id

            var now = new Date();
            const deadline = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const asset = await Recipe.update(
                { 
                    isActive: 'true', 
                    deadline: deadline
                },
                { 
                    where: { 
                        id: id 
                    } 
                }
            )
            response.status(200).json("Accept Request Success!")
        } catch (error) {
            response.status(500).json(error)
        }
    }

    static async getAllWakafDatas(req, response){
        try {
            const wakafDatas = await wakaf.findAll()
            response.status(200).json(wakafDatas)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    static async getWakafById(req, response){
        try {
            const { id } = req.params
            const wakafById = await wakaf.findOne({
                where:{
                    id
                }
            })
            response.status(200).json(wakafById)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    static async setDistribution(req, response){
        try {
            const { id } = req.body
            const { isReceive } = req.body
            const getData = await wakaf.findOne({
                where :{
                    id
                }
            })
            if(isReceive && !getData.status ){
                //  await wakaf.update({
                //     name : getData.name,
                //     gender : getData.gender,
                //     address : getData.address,
                //     status : 'true',
                // })
                // Change everyone without a last name to "Doe"
                const receive = await wakaf.update({ status: "true" }, 
                {
                    where: {
                    id : getData.id
                    }
                })
            }
            response.status(200).json(receive)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    static async updateFund(req, response){
        try {
            const { dateInYear, id } = req.body
            const getCapital = await fund.findAll({
                where: {
                    obtained_at : dateInYear
                }
            })
            //get amount penerimaan wakaf
            const getAmount = await distribution.findAll({
                where:{
                    WakafId:id
                }
            })
            //perhitungan capital - amount
            const capitalFund = await getYear.capital
            const amountDistribution = await getAmount.amount
            let calculation = await capitalFund - amountDistribution

            const updatedCapital = await fund.update({ capital: calculation }, 
            {
                where: 
                {
                    obtained_at : dateInYear
                }
            })

            response.status(200).json(updatedCapital)            
        } catch (error) {
            response.status(500).json(error)
        }
    }

}
module.export = adminController