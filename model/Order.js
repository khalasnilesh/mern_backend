const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,

    title: {
        maxlength: 200,
        minlength: 1,
        required: true,
        trim: true,
        type: String
    },
    description: {
        maxlength: 100000,
        trim: true,
        type: String
    },
    productId: 
    {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
        },
        
        status: {
            required: true,
            type: Number
        },
        total :
        {
            type: String
        },


},
    {
        timestamps: true
    });


    orderSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_orders', orderSchema);