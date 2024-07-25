const express = require('express');
require('colors');
const cors =require('cors');
const products = require('./data/products.js');
require('dotenv').config();
const connectDb=require('./config/config.js');
const productRoutes=require('./routes/productsRoute.js')
const {errorHandler} =require('./middlewares/errorMiddleware.js')
const app = express();
const userRoutes =require('./routes/UserRoute.js')
connectDb();
//Middleware for body parser
app.use(express.json());
// Enable CORS for all origins
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Node Server</h1>');
});

app.use('/api',productRoutes);
app.use('/api/users',userRoutes);
app.use(errorHandler);

const PORT=8000;
app.listen(process.env.PORT||PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta);
});
