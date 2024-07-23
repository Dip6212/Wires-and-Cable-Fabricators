/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure the email transport using the default SMTP transport and a Gmail account.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

// Cloud Function to send an email
exports.sendEmail = functions.https.onCall((data, context) => {
  const mailOptions = {
    from: functions.config().email.user,
    to: data.to,
    subject: data.subject,
    text: data.text,
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      return { message: 'Email sent successfully!' };
    })
    .catch((error) => {
      return { error: error.toString() };
    });
});
