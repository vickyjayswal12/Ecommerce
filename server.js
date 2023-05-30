import express from 'express';
// this is use for store confidential data into production
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRouter.js"
// this is for not give cross origin console.error();
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'




// configure env
dotenv.config(); //in this define path of env our env file into root so dont require 

//database config
connectDB();

//rest object
const app = express()

//middelwares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);

//rest api
app.get('/', (req, resp) => {
    resp.send("<h1>heloo world</h1>")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on  port ${PORT}`);
})
