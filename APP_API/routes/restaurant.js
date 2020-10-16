var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/restaurant')

router.get('/menu', ctrlMain.getMenus);

module.exports = router;
