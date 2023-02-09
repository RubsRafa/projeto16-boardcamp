import { db } from '../database/database.js';

export async function getRentals(req, res) {
    try {

        const rentals = await db.query('SELECT * FROM rentals;');

        return res.send(rentals.rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}