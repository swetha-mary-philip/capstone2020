const moongose = require('mongoose');
var fs = require('fs');

const Menu = moongose.model("Menu");
const Order = moongose.model("Order");
const ReservationSlots = moongose.model("ReservationSlot");
const Reservation= moongose.model("Reservation");

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

module.exports = {getMenus,getavailability,getreservations, 
                    getorders,getsingleorder, getsinglemenu, cancelorder};
