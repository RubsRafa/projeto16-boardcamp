import { db } from '../database/database.js';

export async function getRentals(req, res) {
    try {

        const rentals = await db.query(`
        SELECT rentals.*, customers.id AS customer, customers.name AS customer, games.id AS game, games.name AS game 
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