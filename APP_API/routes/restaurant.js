var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/restaurant')

//MENU
router.get('/menu', ctrlMain.getMenus);
router.get('/menu/:menuid', ctrlMain.getsinglemenu);

//CUSTOMER
//USER

// ORDERS
router.get('/order', ctrlMain.getorders);
//router.post('/order', ctrlMain.createorder);
router.get('/order/:orderid',  ctrlMain.getsingleorder);
router.put('/order/:orderid', ctrlMain.cancelorder);


//RESERVATION
router.get('/reservationslots', ctrlMain.getavailability);
router.get('/reservations', ctrlMain.getreservations);

module.exports = router;
