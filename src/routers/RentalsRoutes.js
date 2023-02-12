import { Router } from "express";
import { deleteRentals, finishRentals, getRentals, postRentals } from "../controllers/Rentals.js";
import { deleteRentalValidation } from "../middlewares/deleteRentalValidation.js";
import { postRentalValidation } from "../middlewares/postRentalValidation.js";
import { updateRentalValidation } from "../middlewares/updateRentalValidation.js";
import { validateSchema } from '../middlewares/validateSchema.js'
import { rentalSchema } from '../schemas/RentalsSchema.js'

const rentalsRouter = Router(); 

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateSchema(rentalSchema), postRentalValidation, postRentals);
rentalsRouter.post('/rentals/:id/return', updateRentalValidation, finishRentals);
rentalsRouter.delete('/rentals/:id', deleteRentalValidation, deleteRentals);

export default rentalsRouter;