import { db } from "../database/database.js";

export async function postRentalValidation (req, res, next) {
    const rental = req.body;

    try {

        const customerIdExist = await db.query('SELECT * FROM customers WHERE id = $1;', [rental.customerId]);
        if (!customerIdExist.rows[0]) return res.sendStatus(400);
        
        const gameIdExist = await db.query('SELECT * FROM games WHERE id = $1;', [rental.gameId]);
        if (!gameIdExist.rows[0]) return res.sendStatus(400);
        
        if (rental.daysRented <= 0) return res.sendStatus(400);

        if (gameIdExist.rows[0].stockTotal <= 0) return res.sendStatus(400);

        const gameRentals = await db.query('SELECT * FROM rentals WHERE rentals."gameId" = $1', [rental.gameId]);
       
        if (gameIdExist.rows[0].stockTotal - gameRentals.rowCount <= 0) return res.sendStatus(400);

        res.locals.rental = rental;
        next(); 
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};