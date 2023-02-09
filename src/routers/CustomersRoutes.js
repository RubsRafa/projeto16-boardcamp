import { Router } from "express";
import { getCustomers, getCustomersById } from "../controllers/Customers.js";
import { getCustomerIdValidation } from "../middlewares/getCustomerIdValidation.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerIdValidation, getCustomersById);

export default customersRouter; 