const mongoose = require('mongoose');

const podcastSchema = mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: { type: String, required: true}
})

module.exports = mongoose.model('Podcast', podcastSchema)