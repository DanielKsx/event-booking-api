const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    performer: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    testimonials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Testimonial'
    }]
});

module.exports = mongoose.model('Concert', concertSchema);