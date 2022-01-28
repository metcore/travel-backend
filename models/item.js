var model = require("../models/baseModel");
var {sequelize, DataTypes} = require("sequelize");

const Item = model.define('item',{
	title:{
		type:DataTypes.STRING,
		allowNull:false,
	},
	description:{
		type:DataTypes.STRING,
		allowNull:false,
	},
	category_item_id:{
		type:DataTypes.STRING,
		allowNull:false,
	},
	owner_user_id:{
		type:DataTypes.INTEGER,
		allowNull:false,
	},
	price:{
		type:DataTypes.FLOAT,
		allowNull:false
	},
	longtitude:{
		type:DataTypes.FLOAT,
		allowNull:false
	},
	latitude:{
		type:DataTypes.FLOAT,
		allowNull:false
	},
	image_1 :{
		type:DataTypes.STRING,
		allowNull:true,

	  	get () { // this defines the 'getter'
	      return this.getDataValue('image_1') ? "https://localhost:3000/uploads/items/"+this.getDataValue('image_1') : null
	    },
	},
	image_2 :{
		type:DataTypes.STRING,
		allowNull:true,

	  	get () { // this defines the 'getter'
	      return this.getDataValue('image_2') ? "https://localhost:3000/uploads/items/"+this.getDataValue('image_2') : null
	    },
	},
	image_3 :{
		type:DataTypes.STRING,
		allowNull:true,

	  	get () { // this defines the 'getter'
	      return this.getDataValue('image_3') ? "https://localhost:3000/uploads/items/"+this.getDataValue('image_3') : null
	    },
	},
	image_4 :{
		type:DataTypes.STRING,
		allowNull:true,

	  	get () { // this defines the 'getter'
	      return this.getDataValue('image_4') ? "https://localhost:3000/uploads/items/"+this.getDataValue('image_4') : null
	    },
	},
	image_5 :{
		type:DataTypes.STRING,
		allowNull:true,

	  	get () { // this defines the 'getter'
	      return this.getDataValue('image_5') ? "https://localhost:3000/uploads/items/"+this.getDataValue('image_5') : null
	    },
	}
},{
	timestamps:true,
	paranoid:true
})

module.exports = Item;