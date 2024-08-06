require('dotenv').config();
const asyncWrapper = require('express-async-handler');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connectDB = require('./config/connectDB');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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