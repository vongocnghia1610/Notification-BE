const serviceAccount = require('../../../serviceAccountKey.json');
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
admin.database.ServerValue.TIMESTAMP;
const db = admin.firestore();
module.exports = db;