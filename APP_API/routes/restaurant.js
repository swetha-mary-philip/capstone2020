var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/restaurant')

//MENU
router.get('/menu', ctrlMain.getMenus);
router.get('/menu/:menuid', ctrlMain.getsinglemenu);

//CUSTOMER
router.get('/customer/:custid', ctrlMain.getcustomer);
router.post('/customer', ctrlMain.createcustomer);
router.put('/customer/:custid', ctrlMain.updatecustomer);


// ORDERS
router.get('/order', ctrlMain.getorders);
router.post('/orders', ctrlMain.createorder);
router.get('/order/:orderid',  ctrlMain.getsingleorder);
router.put('/order/:orderid', ctrlMain.cancelorder);


//RESERVATION
router.get('/reservationslots', ctrlMain.getavailability);
router.get('/reservations', ctrlMain.getreservations);

module.exports = router;
