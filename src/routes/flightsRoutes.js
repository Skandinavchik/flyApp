import express from 'express';
import { getAllFlights, createFlight } from '../controllers/flightsController.js';


const flightsRouter = express.Router();

flightsRouter.route('/')
    .get(getAllFlights)
    .post(createFlight);


export { flightsRouter };