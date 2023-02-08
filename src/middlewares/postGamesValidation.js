import { db } from "../database/database.js";

export async function postGamesValidation(req, res, next) {
    const game = req.body;

    try {

        if (!game) return res.sendStatus(400);
        if (!game.name || !game.image || !game.stockTotal || !game.pricePerDay) return res.sendStatus(400)

        if (game.stockTotal < 1 && game.pricePerDay < 1) return res.sendStatus(400)

        const gameNameExist = await db.query(`SELECT (name) FROM games where name = '${game.name}';`);
     
        if (gameNameExist.rows.length !== 0) return res.status(409).send('This game already exist')

        res.locals.game = game;
        
        next(); 
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}