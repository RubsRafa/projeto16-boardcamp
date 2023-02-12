import { db } from "../database/database.js";

export async function updateRentalValidation(req, res, next) {
    const { id } = req.params;

    try {
        if (!id) return res.sendStatus(404);
        const idExist = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        
        if (!idExist.rows[0]) return res.sendStatus(404);

        if (idExist.rows[0].returnDate !== null && idExist.rows[0].delayFee !== null) return res.sendStatus(400);

        res.locals.id = id;
        next(); 

        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error); 
    }
}