const Agenda = require('agenda');
const nodemailer = require('nodemailer');
require('dotenv').config();

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI, collection: 'agendaJobs' } });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Define email job
agenda.define('send email', async (job) => {
  const { email, subject, body } = job.attrs.data;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text: body
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

// Initialize Agenda
const initializeAgenda = () => {
  agenda.start().then(() => console.log('Agenda started successfully'));
};

module.exports = { agenda, initializeAgenda };
