import { getGames, postGames } from "../controllers/Games.js";
import { Router } from "express";
import { postGamesValidation } from "../middlewares/postGamesValidation.js";
import { validateSchema } from '../middlewares/validateSchema.js'
import { gameSchema } from "../schemas/GamesSchema.js";

const gamesRouter = Router(); 

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', postGamesValidation, validateSchema(gameSchema), postGames);

export default gamesRouter;