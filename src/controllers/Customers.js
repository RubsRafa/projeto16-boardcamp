import { db } from "../database/database.js";

export async function getCustomers(req, res) {
 
    try {

        const customers = await db.query('SELECT * FROM customers;');
        
        res.send(customers.rows);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};
export async function getCustomersById(req, res) {
    const id = res.locals.id;

    try {

        const customersId = await db.query('SELECT * FROM customers where id = $1', [id]);

        res.send(customersId.rows[0]);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};
export async function postCustomers(req, res) {
    const customer = res.locals.customer; 
    
    try {

        await db.query('INSERT INTO customers (name, phone, cpf, birthday) values ($1, $2, $3, $4);', [customer.name, customer.phone, customer.cpf, customer.birthday]);

        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};
export async function putCustomers(req, res) {
    const { id, customer } = res.locals;

    try {

        const customerChanges = await db.query('SELECT * FROM customers WHERE id = $1', [id]);

        if(customerChanges.rows[0].name !== customer.name) {
            await db.query('UPDATE customers SET name = $1 WHERE id = $2;', [customer.name, id]);
        };

        if(customerChanges.rows[0].phone !== customer.phone) {
            await db.query('UPDATE customers SET phone = $1 WHERE id = $2;', [customer.phone, id]);
        };

        if(customerChanges.rows[0].birthday !== customer.birthday) {
            await db.query('UPDATE customers SET birthday = $1 WHERE id = $2;', [customer.birthday, id]);
        };

        if(customerChanges.rows[0].cpf !== customer.cpf) {
          
            let cpfExist = await db.query('SELECT * FROM customers WHERE customers.cpf = $1;', [customer.cpf]);

            if (cpfExist.rows[0]) return res.sendStatus(409);
            
            await db.query('UPDATE customers SET cpf = $1 WHERE id = $2;',[customer.cpf, id]);
        };

        return res.sendStatus(200);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};