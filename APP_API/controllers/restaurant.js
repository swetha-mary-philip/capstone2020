const moongose = require('mongoose');
var fs = require('fs');

const Menu = moongose.model("Menu");
const Order = moongose.model("Order");
const ReservationSlots = moongose.model("ReservationSlot");
const Reservation= moongose.model("Reservation");
const Customer= moongose.model("Customer");

//MENUS
const getMenus = function (req, res){
    
    Menu.find().exec(function(err,menudata){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(menudata);

    })
};

const getsinglemenu = function (req, res){
    
    let id = req.params.menuid;
    Menu.aggregate([
        {$match : {_id : moongose.Types.ObjectId(id)}}
    ]).exec(function(err, menudata) {
        if(err){
            res
            .status(404)
            .json(err);
            return;
        }
        
        res
        .status(200)
        .json(menudata);
    });

};

//CUSTOMER
const createcustomer = function (req, res){

    Customer.create({
        firstname :req.body.firstname,
        lastname :req.body.lastname,
        email :req.body.email,
        phone: req.body.phone,
        createdate:Date.now(),
        modifieddate:Date.now(),
        address: req.body.address     
    }, 
    (err,custData) =>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(custData);
        }
    })
};

const updatecustomer = function (req, res){
    console.log(req.params.custid);
    if(!req.params.custid){
        res
        .status(404)
        .json({"message": "not found, custid is required"});
        return;
    }
    Customer.findById(req.params.custid)
    .exec((err, custdata) => {
        if(!custdata){
            res
            .json(404)
            .status({"message": "custid not found"});
            return;
        }
        else if(err){
            res
            .status(400)
            .json(err);
            return;
        }
        
        custdata.firstname = req.body.firstname;
        custdata.lastname = req.body.lastname;
        custdata.email = req.body.email;
        custdata.phone = req.body.phone;
        //custdata.createdate = Date.now();
        custdata.modifieddate = Date.now();
        custdata.address = req.body.address;
    
        custdata.save((err,custdata) =>{
            if(err){
                res.status(404).json(err);
            }
            else{
                res.status(200).json(custdata);
            }
        })
    })
};

const getcustomer = function (req, res){
    
    let id = req.params.custid;
    Customer.aggregate([
        {$match : {_id : moongose.Types.ObjectId(id)}}
    ]).exec(function(err, custdata) {
        if(err){
            res
            .status(404)
            .json(err);
            return;
        }
        
        res
        .status(200)
        .json(custdata);
    });

};



//RESERVATION
const getavailability = function (req, res){
    
    ReservationSlots.find().exec(function(err,menudata){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(menudata);

    })
};

const getreservations = function (req, res){
    
    Reservation.find().exec(function(err,data){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(data);

    })
};

//ORDERS
const getorders = function (req, res){
    
    Order.find().exec(function(err,data){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(data);

    })
};

const cancelorder = function (req, res){
    if(!req.params.orderid){
        res
        .status(404)
        .json({"message": "not found, orderid is required"});
        return;
    }
    Order.findById(req.params.orderid)
    .exec((err, fooddata) => {
        if(!fooddata){
            res
            .json(404)
            .status({"message": "orderid not found"});
            return;
        }
        else if(err){
            res
            .status(400)
            .json(err);
            return;
        }
        
        fooddata.status = "Cancelled";
    
        fooddata.save((err,fooddata) =>{
            if(err){
                res.status(404).json(err);
            }
            else{
                res.status(200).json(fooddata);
            }
        })
    })
};

const getsingleorder = function (req, res){
    
    let id = req.params.orderid;
    Order.aggregate([
        {$match : {_id : moongose.Types.ObjectId(id)}},
        {$lookup: {
            from: "customers", // collection name in db
            localField: "customer_id",
            foreignField: "_id",
            as: "customer_details"
        }
    }
    ]).exec(function(err, orderdata) {
        if(err){
            res
            .status(404)
            .json(err);
            return;
        }
        
        res
        .status(200)
        .json(orderdata);
    });

};

const createorder = function (req, res){

    Order.create({
        status :req.body.status,
        order_type :req.body.order_type,
        special_instructions :req.body.special_instructions,
        orderdate: Date.now(),
        payment:req.body.payment,
        amount:req.body.amount,
        customer_id: moongose.Types.ObjectId(req.body.customer_id),
        order_details: req.body.order_details     
    }, 
    (err,orderData) =>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(orderData);
        }
    })
};

//REVIEWS

module.exports = {getMenus,getavailability,getreservations, createcustomer, updatecustomer,getcustomer,
                    getorders,getsingleorder, getsinglemenu, cancelorder, createorder};
