import { db } from "../database/database.js";

export async function getGames(req, res) {
    try {

        const games = await db.query('SELECT * FROM games;')
       
        return res.send(games.rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}