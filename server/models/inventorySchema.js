const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema(
    {
        itemName : {
            type : String,
            required : true,
            unique : true
        },
        itemCategory : String,
        qty : Number,
    }
);

const InventoryModel = mongoose.model('InventoryModel',inventorySchema);
module.exports = InventoryModel;