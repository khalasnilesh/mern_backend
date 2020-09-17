const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const clerkSchema = new Schema({
    title: {
        maxlength: 100,
        minlength: 1,
        required: true,
        trim: true,
        type: String
    },
    slug: {
        maxlength: 100,
        trim: true,
        type: String
    },
 
  
   
    
},
    {
        timestamps: true
    });


    clerkSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Clerk', clerkSchema);