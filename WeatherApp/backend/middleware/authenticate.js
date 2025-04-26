const jwt = require('jsonwebtoken');

/**
 * Middleware: Tarkistaa JWT-tokenin Authorization-headerista.
 * Jos token on validi, asettaa req.user ja jatkaa.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token puuttuu' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Virheellinen token' });
    req.user = user;  // { userId, email, iat, exp }
    next();
  });
}

module.exports = authenticateToken;