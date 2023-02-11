import { db } from '../database/database.js';

export async function getRentals(req, res) {
    try {

        const rentals = await db.query('SELECT * FROM rentals');

        const customer = await db.query('SELECT customers.id, customers.name FROM customers;');
        const game = await db.query('SELECT games.id, games.name FROM games;');

        const newRentals = rentals.rows.map(r => ({
            ...r,
            customer: customer.rows.find(c => c.id === r.customerId),
            game: game.rows.find(g => g.id === r.gameId)
        }))

        return res.send(newRentals)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
};
export async function postRentals(req, res) {
    const rental = req.body; 
    //rental = customerId, gameId, daysRented;
    try {
        const price = await db.query('SELECT * FROM games WHERE id = $1', [rental.gameId]).rows[0].pricePerDay; 
        const originalPrice = price * rental.daysRented;

        await db.query(`INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [rental.customerId, rental.gameId, Date('YYYY,MM,DD'), rental.daysRented, null, originalPrice, null]);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

//INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES (2, 11, '2021-06-20', 3, null, 6000, null);