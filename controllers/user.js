var User = require("../models/user");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const UserController = {
	async index(req, res, next){
		var page = 0;
		if(req.query.page){
		    page =  20 * req.query.page - 20;
		}

		var user = await User.findAll({
		    offset: page,
		});

		res.status(200).json({
		    message: 'Data has been return',
		    data:user
		});
	},
	async create(req, res, next){
		var user = await User.create({
				mobile_number:req.body.mobile_number,
				first_name:req.body.first_name,
				last_name:req.body.last_name,
				email:req.body.email,
		})

		res.status(404).json({
			message :"Sukses create a new user",
			data:user
		})
	},
	async update(req, res, next){
		var user = await User.update({
			where:{

			}
		})
	},
	async requestOtp(req, res, next){
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
      		return res.status(400).json({ errors: errors.array() });
   		}

		var mobileNumber = req.body.mobile_number;
		var user = await User.findOrCreate({
			where:{mobile_number:mobileNumber},
			defaults: {
				otp: Math.floor(1000 + Math.random() * 9000),
				position:"1"
			}
		})

		res.status(404).json({
			message :"Request Sukses, otp has been send",
			data:user[0].mobile_number
		})
	},
	async acceptOtp(req,res,next){
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
      		return res.status(400).json({ errors: errors.array() });
   		}
		var mobileNumber = req.body.mobile_number;
		var otp = req.body.otp;
		var user = await User.findOne({where:{mobile_number:mobileNumber, otp:otp}})
		if(!user){
			res.status(404).json({
				message:"Otp is wrong",
				data:{
					otp:otp,
					mobileNumber:mobileNumber,
					position:user.position,
					profile_photo:user.profile_photo,
					profile_thumbnail:user.profile_thumbnail
				}
			})
		}

		// Create token
	    const token = user.generatedJwt();

		res.status(200).json({
			message :"Success login",
			data:{
				token : token
			}
		})
	},
	async validateUser(req, res, next){

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
      		return res.status(400).json({ errors: errors.array() });
      	}

		const config = process.env;
		const token = req.body.token || req.query.token || req.headers['authorization'];
		const decodeToken = jwt.verify(token, config.JWT_KEY);

		var user = await User.update({
			first_name : req.body.first_name,
			last_name: req.body.last_name,
			email : req.body.email,
			verifyAt: Date.now()
		},{
			where:{
				id:decodeToken.user_id
			}
		});

		res.status(200) .json("sukses veryfied")

	},
	async logout(){
		
	}
}

module.exports = UserController