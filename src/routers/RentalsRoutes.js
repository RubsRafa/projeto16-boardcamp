import { Router } from "express";
import { getRentals } from "../controllers/Rentals.js";

const rentalsRouter = Router(); 

rentalsRouter.get('/rentals', getRentals);

export default rentalsRouter;