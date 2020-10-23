var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/restaurant')

router.get('/menu', ctrlMain.getMenus);
router.get('/orders', ctrlMain.getorders);
router.get('/reservationslots', ctrlMain.getavailability);
router.get('/reservations', ctrlMain.getreservations);

module.exports = router;
