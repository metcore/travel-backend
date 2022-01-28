var model = require('../models/baseModel');
var {sequelize , DataTypes } = require('sequelize');
var jwt = require('jsonwebtoken');

const User = model.define('users',{
	first_name :{
		type:DataTypes.STRING,
		allowNull:true,
		unique:true,
		notEmpty:true,
	},
	last_name :{
		type:DataTypes.STRING,
		allowNull:true,
		unique:true,
		notEmpty:true,
	},
	mobile_number :{
		type:DataTypes.STRING,
		allowNull:true,
		unique:true,
		notEmpty:true,
	},
	email :{
		type:DataTypes.STRING,
		allowNull:true,
	},
	otp :{
		type:DataTypes.STRING,
		allowNull:true,
		unique:true,
		notEmpty:true,
	},
	profile_photo :{
		type:DataTypes.STRING,
		allowNull:true,
		unique:true,
		notEmpty:true,
	},
	profile_thumbnail :{
		type:DataTypes.STRING,
		allowNull:true,
	},
	position :{
		type:DataTypes.INTEGER,
		allowNull:false,
	},
	verifyAt :{
		type:DataTypes.DATE,
		allowNull:true,
	},
},{
	tableName:'users',
	timestamps: true,
  	paranoid: true,
	
})

User.prototype.generatedJwt = function () {
 	return jwt.sign(
      	{ 
      		user_id: this.id, 
      		mobile_number : this.mobile_number,
      		verifyAt :  this.verifyAt,
      	},
      	process.env.JWT_KEY,
      	{
        	expiresIn: "2h",
      	}
    );
};

module.exports = User;