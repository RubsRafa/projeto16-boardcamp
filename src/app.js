import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import gamesRouter from "./routers/GamesRoutes.js";
import customersRouter from "./routers/CustomersRoutes.js";
dotenv.config(); 

const app = express(); 
app.use(cors());
app.use(express.json());

app.use([gamesRouter, customersRouter])

app.listen(process.env.PORT, () => console.log(`Servidor funcionando na porta ${process.env.PORT}`))