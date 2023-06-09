import mongoose from 'mongoose';


const seatsSchema = new mongoose.Schema({
    number: {
        type: String,
    },
    available: {
        type: Boolean,
    },
});

const flightsSchema = new mongoose.Schema({
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    departure: {
        type: Date,
    },
    arrival: {
        type: Date,
    },
    duration: {
        type: String,
    },
    price: {
        type: Number,
    },
    seats: {
        type: [seatsSchema],
    },
}, { timestamps: true });


const Flight = mongoose.model('Flight', flightsSchema);

export { Flight };