import { Flight } from "../models/flightsModel.js";


const getAllFlights = async (req, res) => {
    try {

        const { from, to, departure, sort } = req.query;

        const queryObject = { ...req.query };
        const excludedFields = ['limit', 'page', 'sort', 'from', 'to', 'departure'];
        excludedFields.forEach(item => delete queryObject[item]);

        let query = Flight.find();

        from
            ? query = query.find({ 'from': { $regex: `${from}`, $options: 'i' } })
            : queryObject;

        to
            ? query = query.find({ 'to': { $regex: `${to}`, $options: 'i' } })
            : queryObject;

        departure
            ? query = query.find({ 'departure': {$gte: departure} })
            : queryObject;

        sort
            ? query = query.sort(sort.replaceAll(',', ' '))
            : query = query.sort('from');

        const flights = await query;

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