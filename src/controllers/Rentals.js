import { db } from '../database/database.js';

export async function getRentals(req, res) {
    try {

        const rentals = await db.query(`
        SELECT rentals.*, customers.* AS customer, games.* AS game 
        FROM rentals 
        JOIN customers 
        ON customers.id = rentals."customerId"
        JOIN games
        ON games.id = rentals."gameId";`);

        console.log(rentals.rows)
        return res.send(rentals.rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}