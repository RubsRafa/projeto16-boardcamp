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

        res.send(customersId.rows[0]);
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
};
export async function postCustomers(req, res) {
    const customer = res.locals.customer; 
    
    try {

        await db.query('INSERT INTO customers (name, phone, cpf, birthday) values ($1, $2, $3, $4);', [customer.name, customer.phone, customer.cpf, customer.birthday]);

        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
};