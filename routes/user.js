var express = require('express');
var router = express.Router();
var mysql = require('../config/databases');
var UserController = require('../controllers/user');
const { body, check } = require('express-validator');

router.get('/', UserController.index)
router.post('/validate-user',[
		check('first_name').isString().isLength({ min: 4, max:50 }),
		check('last_name').isString().isLength({ min: 4, max:50 }),
		check('email').isEmail(),
		check("related_category_id").exists()
	], UserController.validateUser)

router.post('/create',[
		check('first_name').isString().isLength({ min: 4, max:50 }),
		check('last_name').isString().isLength({ min: 4, max:50 }),
		check('mobile_number').isMobilePhone().withMessage('Invalid mobile phone number'),
		check('email').isEmail(),
	], UserController.validateUser)

router.get('/logout', UserController.logout);
module.exports = router;