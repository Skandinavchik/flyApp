import { Flight } from "../models/flightsModel.js";


const getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.find();

        res.status(200).json({
            status: 'success',
            results: flights.length,
            data: {
                flights,
            },
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};

const createFlight = async (req, res) => {
    try {
        const { from, to, departure, arrival, duration, price, seats } = req.body;

        const flight = await Flight.create({
            from,
            to,
            departure,
            arrival,
            duration,
            price,
            seats,
        });

        res.status(201).json({
            status: 'success',
            data: {
                flight,
            },
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};


export { getAllFlights, createFlight };