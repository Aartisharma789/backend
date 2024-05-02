const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// config
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: 'backend/config/config.env' });
}

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan('dev'));

// Routes import
const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const importProduct = require('./routes/importProduct');

// Routes
app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use('/api/v1', importProduct);

// Deployment
__dirname = path.resolve();
app.get('/', (req, res) => {
	res.send('Server is Running! 🚀');
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;