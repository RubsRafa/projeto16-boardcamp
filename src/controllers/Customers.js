import { db } from "../database/database.js";

export async function getCustomers(req, res) {
    try {

        const customers = await db.query('SELECT * FROM customers;');
        console.log(customers.rows)
        res.send(customers.rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}