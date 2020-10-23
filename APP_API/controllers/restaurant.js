const moongose = require('mongoose');
var fs = require('fs');

const Menu = moongose.model("Menu");
const Order = moongose.model("Order");
const ReservationSlots = moongose.model("ReservationSlot");
const Reservation= moongose.model("Reservation");

const getMenus = function (req, res){
    
    Menu.find().exec(function(err,menudata){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(menudata);

    })
};

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

const getorders = function (req, res){
    
    Order.find().exec(function(err,data){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(data);

    })
};

module.exports = {getMenus,getavailability,getreservations, getorders};
