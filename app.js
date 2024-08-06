require('dotenv').config();
const asyncWrapper = require('express-async-handler');

const express = require('express');
const AppError = require('./utils/AppError');
const logger = require('morgan');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const connectDB = require('./config/connectDB');

const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const subCategory = require('./routes/subCategory');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/sub-categories', subCategory);

app.all('*', (req, res, next) => {
	return next(new AppError(`cannot find this route ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
const sever = app.listen(
	port,
	asyncWrapper(async () => {
		await connectDB();
		console.log(`FinTech app listening on port ${port}!`);
	}),
);

// Handling rejection outside express
process.on('unhandledRejection', (err) => {
	console.log(
		`> Unhandled rejection Error: ${err.name} | ${err.message}`.underline.red,
	);
	sever.close(() => {
		console.log('Shutting down...');
		process.exit(1);
	});
});