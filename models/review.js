var model = require('../models/baseModel');
const { DataTypes } = require('sequelize');
var Movie = require('../models/movie');

const Review = model.define('reviews', {
	movie_id :{
		type:DataTypes.NUMBER,
		allowNull:false
	},
	name :{
		type:DataTypes.STRING,
		allowNull:false,
		notEmpty:true
	},
	review :{
		type:DataTypes.STRING,
		allowNull:false,
		notEmpty:true
	},
},{
	tableName:'reviews',
	timestamps: false
})
module.exports = Review;