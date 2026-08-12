const admin = require('firebase-admin');

admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID || 'second-shutter-web'
});

module.exports = admin;
