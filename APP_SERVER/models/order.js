var mongoose = require('mongoose');

var orderdetailsList = new mongoose.Schema({
    name : {type: String, required: true},
    quantity: {type: Number, required: true},
    Menu_item_id:{type : mongoose.Schema.Types.ObjectId, ref : 'Menu'}
});

var orderSchema = new mongoose.Schema({
   customer_id:{type : mongoose.Schema.Types.ObjectId, ref : 'Customer'},
   order_details: [orderdetailsList],
   amount :{type:Number, required: true},
   orderdate : {type:Date, required: true},
   status: {type:String, enum:['Ordered','Delivered','Cancelled']},
   order_type: {type:String, enum:['Dine-in','Delivery']},
   special_instructions:{type:String}
});


module.exports = mongoose.model('Order', orderSchema, 'orders');
