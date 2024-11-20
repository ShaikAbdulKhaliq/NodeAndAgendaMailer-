// config/agenda.js - Agenda Job Scheduler Setup
const Agenda = require('agenda');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const mongoConnectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/agenda';

// Create an instance of Agenda
const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'scheduledJobs' } });

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
      console.error('Error connecting to email server:', error);
    } else {
      console.log('Email server is ready to take messages:', success);
    }
  });

  // Define the job
agenda.define('send-email', async (job) => {
    const { email, subject, body } = job.attrs.data;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: body,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
  
  // Start Agenda
  (async function () {
    await agenda.start();
    console.log('Agenda started successfully.');
  })();
  
  module.exports = agenda;