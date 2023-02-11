import { db } from "../database/database.js";

export async function deleteRentalValidation(req, res, next) {
    const { id } = req.params;
    
    try {

        if (!id) return res.sendStatus(404);
        const rental = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        if (!rental.rows[0]) return res.sendStatus(404);

        console.log('aqui',rental.rows[0].returnDate)
        console.log('aqui',rental.rows[0])
        console.log('aqui',rental)
        if (rental.rows[0].returnDate === null) return res.sendStatus(400);

        res.locals.id = id;
        next(); 
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}