const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const clinicSchema = new Schema({
    name: {
        maxlength: 200,
        minlength: 1,
        required: true,
        trim: true,
        type: String
    },
    address: {
        maxlength: 100000,
        trim: true,
        type: String
    },
    area: {
        maxlength: 100000,
        trim: true,
        type: String
    },
},
    {
        timestamps: true
    });


    clinicSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('clinics', clinicSchema);