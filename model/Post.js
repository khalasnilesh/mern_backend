const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
 
  
   
    
},
    {
        timestamps: true
    });


    postSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);