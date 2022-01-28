var Item = require("../models/item");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const UserController = {
	async index(req, res, next){
		var page = 0;
		if(req.query.page){
		    page =  20 * req.query.page - 20;
		}
		var user = await Item.findAll({
		    offset: page,
		});
		res.status(200).json({
		    message: 'Data has been return',
		    data:user
		});
	},
	async view(req, res, next){
		var id = req.params.id;
		var item = await Item.findByPk(id);
		res.status(200).json({
			message: "Data has been return",
			data:item
		})
	},
	async create(req, res, next){
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
      		return res.status(400).json({ errors: errors.array() });
   		}

		var item = await Item.create({
			title:req.body.title,
			description:req.body.description,
			category_item_id:req.body.category_item_id,
			price:req.body.price,
			longtitude:req.body.longtitude,
			latitude:req.body.latitude,
		})

		res.status(404).json({
			message :"Sukses create a new item",
			data:item
		})
	},
	async update(req, res, next){
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
      		return res.status(400).json({ errors: errors.array() });
   		}

		var item = await Item.update({
			title:req.body.title,
			description:req.body.description,
			category_item_id:req.body.category_item_id,
			price:req.body.price,
			longtitude:req.body.longtitude,
			latitude:req.body.latitude,
		}, {
	      where: {
	        id: req.params.id
	      }
	    });
		res.status(200).json({
			message:"Sukses update item",
			data:item
		})
	},
	async delete(req, res, next){
		var user = await Item.destroy({
		 where:{
			id:req.params.id
		}
		})
	}
}

module.exports = UserController