import { db } from "../database/database.js";

export async function postCustomerValidation(req, res, next) {
    const customer = req.body; 
    
    try {

        if(customer.name === "") return res.sendStatus(400);

        console.log(Number(customer.cpf))
        if(isNaN(Number(customer.cpf))) return res.sendStatus(400)

        const userCpfExist = await db.query('SELECT * FROM customers WHERE cpf = $1', [customer.cpf])

        if(userCpfExist.rows[0]) return res.sendStatus(409);

        res.locals.customer = customer; 
        next(); 
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}