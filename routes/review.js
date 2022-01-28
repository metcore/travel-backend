var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Not found');
});

router.post('/create',middleware, async function(req, res, next) {
  console.log(req.body)
  var reviewData = {
    name : req.body.name,
    review : req.body.review,
    movie_id : req.body.movie_id
  }

  try{
    const review = await Review.create(reviewData);
    res.send({
      code:200,
      message: 'Suksess insert data',
      data:review
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

  console.log(req.params.id)
  var review = await Review.findOne({
    where:{
      id:req.params.id
    },
  });

  res.send({
    code:200,
    message: 'Success get data',
    data:review
  });

});

router.put('/update/:id', async function(req, res, next) {
  console.log(req.params.id)
  console.log(req.body)
  var reviewData = {
    name : req.body.name,
    review : req.body.review,
  }
  var review = await Review.update(reviewData, {
    where: {
      id: req.params.id
    }
  });

  res.send({
    code:200,
    message: 'Success update data',
    data:review
  });
});

router.delete('/delete/:id', async function(req, res, next) {
  await Review.destroy({
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
module.exports = router;
