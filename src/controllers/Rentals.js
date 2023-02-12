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
        }));

        return res.send(newRentals);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};
export async function postRentals(req, res) {
    const rental = res.locals.rental;

    try {
        const rentDate = new Date();

        const price = await db.query('SELECT * FROM games WHERE id = $1;', [rental.gameId]);

        const originalPrice = price.rows[0].pricePerDay * rental.daysRented;

        const returnDate = null;
        const delayFee = null;

        await db.query(`INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [rental.customerId, rental.gameId, rentDate, rental.daysRented, returnDate, originalPrice, delayFee]);

        return res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};
export async function finishRentals(req, res) {
    const id = res.locals.id;

    try {
        const rental = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);

        const returnDate = new Date();

        const rentDate = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);

        const delay = (((returnDate - rentDate.rows[0].rentDate) / (1000 * 60 * 60 * 24)));
   
        const gameIdForPrice = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);

        const price = await db.query('SELECT * FROM games WHERE id = $1', [gameIdForPrice.rows[0].gameId]);

        let delayFee;
        if (Math.round(delay) - rental.rows[0].daysRented <= 0) {
            delayFee = 0;

        } else {

            delayFee = (Math.round(delay) - rental.rows[0].daysRented - 1) * (price.rows[0].pricePerDay / 100);

        };

        await db.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;', [returnDate, delayFee.toFixed(2).replace('.', ''), id]);
        
        return res.status(200).send('OK');

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};
export async function deleteRentals(req, res) {
    const id = res.locals.id; 

    try {

        await db.query('DELETE FROM rentals WHERE id = $1', [id]);
        return res.sendStatus(200);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error); 
    };
};