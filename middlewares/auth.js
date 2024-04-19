const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');

exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {

	let token;

	if (req.cookies.token) {
			token = req.cookies.token;
	}
	else if (req.headers.authorization) {
			token = req.headers.authorization;
	}

	if (!token) {
		return next(new ErrorHandler("Please provide a token to access this route", 401))
	}

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decodedData.id);
	next();
});

exports.authorizeRoles = (...roles) => {
	return (req, res, next) => {

		if (!roles.includes(req.user.role)) {
			return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
		}
		next();
	}
}