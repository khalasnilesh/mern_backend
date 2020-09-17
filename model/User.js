const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username: {
        maxlength: 200,
        minlength: 1,
        required: true,
        trim: true,
        type: String,
        index :
        {
            unique: true
        }
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
        type: String
    },
    date:
    {
        type: Date,
        default: Date.now
    },
    userphoto:
    {
        type: String,
    }
},
    {
        timestamps: true
    });


    userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);