import { Router } from "express";
import { getRentals, postRentals } from "../controllers/Rentals.js";
import { postRentalValidation } from "../middlewares/postRentalValidation.js";
import { validateSchema } from '../middlewares/validateSchema.js'
import { rentalSchema } from '../schemas/RentalsSchema.js'

const rentalsRouter = Router(); 

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateSchema(rentalSchema), postRentalValidation, postRentals);

export default rentalsRouter;