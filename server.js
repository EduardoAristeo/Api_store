const express = require('express');
require('dotenv').config();
const userRouter = require('./routes/UserRouter');
const authJwt = require('./libs/jwt');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoute = require('./routes/product_route');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(authJwt()); // Autenticación JWT

// Prefijo de API y Rutas
const API_PREFIX = process.env.API_PREFIX;
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/products`, productRoute);

// Puerto
const port = process.env.APP_PORT || 3000;

// Conexión a la Base de Datos e Inicio del Servidor
async function main() {
    try {
        await mongoose.connect(process.env.CONN_STRING);
        console.log("Connected to the database.");

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

main();
