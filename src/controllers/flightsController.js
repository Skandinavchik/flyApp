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


export { getAllFlights };