const getTokenFromHeader = (req) => {
	const authHeader = req.headers.authorization;
	if (!authHeader.startsWith('Bearer ') || !authHeader) {
		return null;
	}
	return authHeader.split(' ')[1];
};

module.exports = { getTokenFromHeader };