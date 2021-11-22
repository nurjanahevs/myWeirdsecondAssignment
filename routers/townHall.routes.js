const router = require('express').Router();
const townHallController = require('../controllers/townHallController');

router.get('/:id', townHallController.get);

module.exports = router;