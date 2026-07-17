const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
require('dotenv').config();

// Configure the JWKS client to fetch signing keys dynamically from Supabase
const client = jwksClient({
  jwksUri: process.env.SUPABASE_JWKS_URL,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMin: 10
});

// Helper function to dynamically retrieve the signing key
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access Denied: No Bearer Token Provided' });
  }

  const token = authHeader.split(' ')[1];

  // Verify the JWT with the keyset
  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err.message);
      return res.status(403).json({ error: 'Unauthorized: Invalid or expired session token' });
    }

    // Attach decoded user information to the request object
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;