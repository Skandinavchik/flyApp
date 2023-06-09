import mongoose from 'mongoose';


const seatsSchema = new mongoose.Schema({
    number: {
        type: String,
        required: [true, 'Seat number is required'],
        trim: true,
    },
    available: {
        type: Boolean,
        required: [true, 'Availability number is required'],
    },
});

const flightsSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, 'Departure city is required'],
        trim: true,
    },
    to: {
        type: String,
        required: [true, 'Arrival city is required'],
        trim: true,
    },
    departure: {
        type: Date,
        required: [true, 'Departure date is required'],
    },
    arrival: {
        type: Date,
        required: [true, 'Arrival date is required'],
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    seats: {
        type: [seatsSchema],
        required: [true, 'Seats are required'],
    },
}, { versionKey: false });


const Flight = mongoose.model('Flight', flightsSchema);

export { Flight };