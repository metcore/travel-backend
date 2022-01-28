var model = require('../models/baseModel');
const {sequelize , DataTypes } = require('sequelize');
var Review = require('../models/review');

const Movie = model.define('movies', {
	title :{
		type:DataTypes.STRING,
		allowNull:false,
    	unique: true,
    	notEmpty:true
	},
	synopsis :{
		type:DataTypes.STRING,
		allowNull:false
	},
	released_year :{
		type:DataTypes.STRING,
		allowNull:false
	},
	thumbnail :{
		type:DataTypes.STRING,
		allowNull:true,

	  	get () { // this defines the 'getter'
	      return this.getDataValue('thumbnail') ? "https://localhost:3000/uploads/"+this.getDataValue('thumbnail') : null
	    },
	},
},{
	tableName:'movies',
	timestamps: false,
	
})
Movie.hasMany(Review, {foreignKey:'movie_id'});

module.exports = Movie;