var express = require('express');
var router = express.Router();
var mysql = require('../config/databases');
var UserController = require('../controllers/user');
const { body, check } = require('express-validator');
router.post('/request-otp',[
		check('mobile_number').isMobilePhone().withMessage('Invalid mobile phone number'),
  	],
  	UserController.requestOtp
)

router.post('/accept-otp',[
		check('mobile_number').isMobilePhone().withMessage('Invalid mobile phone number'),
		check('otp').isInt().withMessage('Invalid mobile phone number'),
  	],
  	UserController.acceptOtp
)

module.exports = router;