import { Router } from "express";
import { getCustomers, getCustomersById, postCustomers, putCustomers } from "../controllers/Customers.js";
import { getCustomerIdValidation } from "../middlewares/getCustomerIdValidation.js";
import { postCustomerValidation } from "../middlewares/postCustomerValidation.js";
import { putCustomerValidation } from "../middlewares/putCustomerValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/CustomersSchema.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerIdValidation, getCustomersById);
customersRouter.post('/customers', validateSchema(customerSchema), postCustomerValidation, postCustomers);
customersRouter.put('/customers/:id', validateSchema(customerSchema), putCustomerValidation, putCustomers);

export default customersRouter; 