import { db } from "../database/database.js";

export async function getCustomers(req, res) {
    try {

        const customers = await db.query('SELECT * FROM customers;');
        
        res.send(customers.rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
};
export async function getCustomersById(req, res) {
    const id = res.locals.id;

    try {

        const customersId = await db.query('SELECT * FROM customers where id = $1', [id]);

        res.send(customersId.rows);
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}