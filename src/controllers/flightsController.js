import { Flight } from "../models/flightsModel.js";


const getAllFlights = async (req, res) => {
    try {

        const { from, to, sort } = req.query;

        const queryObject = { ...req.query };
        const excludedFields = ['limit', 'page', 'sort'];
        excludedFields.forEach(item => delete queryObject[item]);

        let query = Flight.find(from && to
            ? { 'from': { $regex: `${from}`, $options: 'i' }, 'to': { $regex: `${to}`, $options: 'i' } }
            : queryObject);

        from
            ? query = query.find({ 'from': { $regex: `${from}`, $options: 'i' } })
            : queryObject;

        sort
            ? query = query.sort(sort.replaceAll(',', ' '))
            : query = query.sort('from');

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 20;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const flightsAmount = await Flight.countDocuments();

            if (skip >= flightsAmount) {
                res.status(404).json({
                    status: 'failed',
                    message: `This page doesn't exist`
                });
                return;
            }
        }

        // Execute query
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