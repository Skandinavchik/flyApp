import express from 'express';
import { getAllFlights } from '../controllers/flightsController.js';


const flightsRouter = express.Router();

flightsRouter.route('/')
    .get(getAllFlights);


export { flightsRouter };