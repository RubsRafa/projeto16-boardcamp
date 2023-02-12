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
    const rental = res.locals.rental;

    //rental = customerId, gameId, daysRented;
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
    }
};
export async function finishRentals(req, res) {
    const id = res.locals.id;

    try {
        const rental = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);

        const returnDate = new Date("2021-06-26");
        console.log('returnDate', returnDate)

        const rentDate = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        console.log('rentDate', rentDate.rows[0].rentDate)

        // ((((diaAlugado - diaDevolvido)/100000000)*(-1)).toFixed(0))
        const delay = (((rentDate.rows[0].rentDate - returnDate) / 100000000) * (-1));
        console.log('delay', Math.round(delay))

        const gameIdForPrice = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        console.log('gameIdforprice', gameIdForPrice.rows[0].gameId)

        const price = await db.query('SELECT * FROM games WHERE id = $1', [gameIdForPrice.rows[0].gameId]);
        console.log('price', price.rows[0].pricePerDay / 100)

        let delayFee;
        if (Math.round(delay) - rental.rows[0].daysRented <= 0) {
            delayFee = 0;

        } else {
            delayFee = (Math.round(delay) - rental.rows[0].daysRented) * (price.rows[0].pricePerDay) / 100;
            console.log('delayFee', delayFee.toFixed(2).replace('.', ''))
        }

        await db.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;', [returnDate, delayFee.toFixed(2).replace('.', ''), id]);
        
        return res.status(200).send('OK');

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
export async function deleteRentals(req, res) {
    const id = res.locals.id; 

    try {

        await db.query('DELETE FROM rentals WHERE id = $1', [id]);
        return res.sendStatus(200);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error); 
    }
}
//INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES (2, 11, '2021-06-20', 3, null, 6000, null);