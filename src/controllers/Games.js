import { db } from "../database/database.js";

export async function getGames(req, res) {
    try {

        const games = await db.query('SELECT * FROM games;');
       
        return res.status(200).send(games.rows);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};

export async function postGames(req, res) {
    const game = res.locals.game;

    try {

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") values ($1, $2, $3, $4);`, [game.name, game.image, game.stockTotal, game.pricePerDay]);
        
        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};