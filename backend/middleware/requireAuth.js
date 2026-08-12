const admin = require('../firebaseAdmin');
const { getAuth } = require('firebase-admin/auth');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify Firebase ID Token
    const decodedToken = await getAuth().verifyIdToken(token);
    
    // Attach the Firebase user info to req.user
    // Note: The uid is the Firebase UID (28 char string), not the Supabase UUID!
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      avatar_url: decodedToken.picture || null
    };
    
    next();
  } catch (err) {
    console.error('Firebase Auth verification failed:', err.message);
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = requireAuth;
