const supabase = require('../supabase');

/**
 * requireAuth middleware
 *
 * Validates the Supabase JWT token passed in the Authorization header.
 * If valid, attaches the decoded user to req.user.
 * If invalid or missing, returns 401.
 *
 * This runs server-side — no authentication logic lives in the browser.
 */
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('requireAuth error:', err.message);
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

module.exports = requireAuth;
