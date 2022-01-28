var express = require('express');
var router = express.Router();
var mysql = require('../config/databases');
var Movie = require('../models/movie');
var Review = require('../models/review');
const multer = require("multer");
const path = require("path");

var middleware = require('../middleware/verifyToken')
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

router.get('/',middleware, async function(req, res, next) {

  var page = 0;
  if(req.query.page){
    page =  20 * req.query.page - 20;
  }

  var movie = await Movie.findAll({
    offset: page,
    // limit: 20,
    include:{
      model:Review
    }
  });
  console.log(movie.thumbnail);
  res.send({
    code:200,
    message: 'Data has been return',
    data:movie
  });
});

router.post('/create', multer({ storage: diskStorage }).single("thumbnail"), async function(req, res, next) {
  console.log(req.file)
  var movieData = {
    title : req.body.title,
    synopsis : req.body.synopsis,
    released_year : req.body.released_year,
    thumbnail :req.file ? req.file.filename : null
  }
  console.log(movieData)
  try{
    const movie = await Movie.create(movieData);
    res.send({
      code:200,
      message: 'Suksess insert data',
      data:movie
    });
  }catch(err){
    var errorMsg = [];
    for (var i = 0; i < err.errors.length; i++) {
      errorMsg[i]={
        message : err.errors[i].message,
      }
    }
    res.send({
      code:400,
      message: 'Validation error',
      data:errorMsg
    });
  }
});

router.get('/view/:id', async function(req, res, next) {
 
  var movie = await Movie.findOne({
    where:{
      id:req.params.id
    },
    include:{
      model:Review
    }
  });

  res.send({
    code:200,
    message: 'Success get data',
    data:movie
  });


});

router.put('/update/:id', multer({ storage: diskStorage }).single("thumbnail"), async function(req, res, next) {
  
  var movie = await Movie.findOne({
    where:{
      id:req.params.id
    },
  });

  var movieData = {
    title : req.body.title,
    synopsis : req.body.synopsis,
    released_year : req.body.released_year,
  }

  if(req.file){
    movieData = {
      title : req.body.title,
      synopsis : req.body.synopsis,
      released_year : req.body.released_year,
      thumbnail :req.file.filename
    }
  }

  try{

    var movie = await Movie.update(movieData, {
      where: {
        id: req.params.id
      }
    });

    res.send({
      code:200,
      message: 'Success update data',
      data:movie
    });
  }catch(err){
    var errorMsg = [];
    for (var i = 0; i < err.errors.length; i++) {
      errorMsg[i]={
        message : err.errors[i].message,
      }
    }
    res.send({
      code:400,
      message: 'Validation error',
      data:errorMsg
    });
  }
});

router.delete('/delete/:id', async function(req, res, next) {
  await Movie.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send({
    code:200,
    message: 'Success delete data',
    data:null
  });
});
router.put('/delete-image/:id', async function(req, res, next) {


  var movieData = {
    thumbnail : null,
  }

  var movie = await Movie.update(movieData, {
    where: {
      id: req.params.id
    }
  });

  res.send({
    code:200,
    message: 'Success delete tumbnail',
    data:null
  });
});
module.exports = router;
