var express = require('express');
var router = express.Router();
var mysql = require('../config/databases');
var ItemController = require('../controllers/ItemController');
const { body, check } = require('express-validator');

router.get('/', ItemController.index)
router.get('/view/:id',ItemController.view)
router.post('/create', [
	check('title').isString().isLength({ min: 4, max:250 }),
	check('description').isString().exists(),
	check('category_item_id').isInt().exists(),
	check("price").isInt().exists(),
	check("longtitude").isFloat().exists(),
	check("latitude").isFloat().exists(),
], ItemController.create)
router.put('/update/:id',ItemController.update)
router.delete('/delete/:id',ItemController.delete)

module.exports = router;