const adminAuth = (req, res, next) => {
    const apiKey = req.header('X-API-Key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).send({ error: 'Access denied. Invalid API key.' });
    }
    next();
  };
  
  module.exports = adminAuth;