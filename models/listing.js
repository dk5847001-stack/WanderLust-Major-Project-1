const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: {
            filename: String,
            url: String
        },
        default: {
            filename: "listingimage",
            url: "https://www.bing.com/th/id/OIP.D_QfonV7GA5Yv8tR2Qu9YAHaFb?w=236&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
        },
        set: (v) => v === '' ? 'https://www.bing.com/th/id/OIP.D_QfonV7GA5Yv8tR2Qu9YAHaFb?w=236&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' : v
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;