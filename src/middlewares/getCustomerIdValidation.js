import { db } from "../database/database.js";

export async function getCustomerIdValidation(req, res, next) {
    const { id } = req.params; 

    try {

        if (!id) return res.sendStatus(404);

        if (id.length === 0 || id === "") return res.sendStatus(404);

        const idExist = await db.query('SELECT * FROM customers WHERE id = $1',[id]);
        if (!idExist.rows[0]) return res.sendStatus(404);

        res.locals.id = id;

        next(); 
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}