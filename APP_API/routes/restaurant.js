var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/restaurant')

//MENU
router.get('/menu', ctrlMain.getMenus);
router.get('/menu/:menuid', ctrlMain.getsinglemenu);
router.post('/menu',ctrlMain.createmenu);
router.put('/menu/:menuid', ctrlMain.updatemenu);
router.delete('/menu/:menuid', ctrlMain.deletemenu);

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
router.post('/reservationslots', ctrlMain.createavailability);
router.put('/reservationslots/:reservationslotid', ctrlMain.updateavailability);


router.get('/reservations', ctrlMain.getreservations);


//REVIEW
router.get('/reviews',  ctrlMain.getreviews);
router.post('/reviews/:orderid', ctrlMain.AddReview);


module.exports = router;
