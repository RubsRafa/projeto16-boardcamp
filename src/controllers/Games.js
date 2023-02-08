import { db } from "../database/database.js";

export async function getGames(req, res) {
    try {

        const games = await db.query('SELECT * FROM games;')
       
        return res.send(games.rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
};

export async function postGames(req, res) {
    const game = res.locals.game;
    console.log('chegou aqui',game)

    try {
        console.log('entrou  no try')

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") values ('${game.name}', '${game.image}', ${game.stockTotal}, ${game.pricePerDay});`)
        console.log('POST no game')
        return res.sendStatus(201)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
};