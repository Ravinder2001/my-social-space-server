const admin = require("firebase-admin");
const {
  project_id,
  private_key,
  client_email,
  client_id,
} = require("./utils/config");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: project_id,
    clientEmail: client_email,
    privateKey: private_key.replace(/\\n/g, "\n"), // Replace escaped newlines
  }),
});

module.exports = admin;
