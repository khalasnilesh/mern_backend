const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: {
        maxlength: 200,
        minlength: 1,
        required: true,
        trim: true,
        type: String,
       
    },
    password: {
        maxlength: 100000,
        trim: true,
        type: String,
        required: true,

    },
    email: {
        maxlength: 100000,
        trim: true,
        type: String,
        required: true,
        index :
        {
            unique: true
        }
        

    },
    status: {
        maxlength: 100000,
        trim: true,
        type: String,
        required: true,

    },
    date:
    {
        type: Date,
        default: Date.now
    },
    // userphoto:
    // {
    //     type: String,
    // }
},
    {
        timestamps: true
    });


    clientSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Client', clientSchema);