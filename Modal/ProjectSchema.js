const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      image:{type: String, default:""},
      podcast:{ type:[mongoose.Schema.Types.ObjectId],default:[], ref:'Podcast'} ,
})

module.exports = mongoose.model('Project', projectSchema)