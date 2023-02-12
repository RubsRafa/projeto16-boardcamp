import { db } from "../database/database.js";

export async function putCustomerValidation(req, res, next) {
    const { id } = req.params; 
    const customer = req.body; 

    try {
        
        const userIdExist = await db.query('SELECT * FROM customers WHERE id = $1', [id]);
        if (!userIdExist.rows[0]) return res.sendStatus(404);

        if(isNaN(Number(customer.cpf))) return res.sendStatus(400);
        
        res.locals.customer = customer; 
        res.locals.id = id; 
        
        next(); 
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}