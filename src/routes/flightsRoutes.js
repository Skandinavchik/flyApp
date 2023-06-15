import express from 'express';
import { getAllFlights, getFlight, createFlight, updateFlight } from '../controllers/flightsController.js';


const flightsRouter = express.Router();

flightsRouter.route('/')
    .get(getAllFlights)
    .post(createFlight);

flightsRouter.route('/:id')
    .get(getFlight)
    .patch(updateFlight);

export { flightsRouter };