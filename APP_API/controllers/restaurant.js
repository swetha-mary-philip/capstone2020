const moongose = require('mongoose');
var fs = require('fs');

const Menu = moongose.model("Menu");
const Order = moongose.model("Order");

const getMenus = function (req, res){
    
    Menu.find().exec(function(err,menudata){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(menudata);

    })
};



module.exports = {getMenus};
