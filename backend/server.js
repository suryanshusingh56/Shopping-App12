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
const orderRoutes = require("./routes/orderRoute");
connectDb();
//Middleware for body parser
app.use(express.json());
// Enable CORS for all origins
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://shopping-app-sooty-chi.vercel.app', // Deployed frontend
  ];
  
  const cors = require('cors');
//   app.options('*', cors()); // Allow preflight for all routes

  const cors = require('cors');

  // CORS Configuration
  const corsOptions = {
    origin: 'https://shopping-app-sooty-chi.vercel.app', // Your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],   // Allowed headers
    credentials: true // Allow cookies (if required)
  };
  
  // Use CORS middleware
  app.use(cors(corsOptions));
  
  

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Node Server</h1>');
});
app.use('/api',productRoutes);
app.use('/api/users',userRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler);

const PORT=process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta);
});
