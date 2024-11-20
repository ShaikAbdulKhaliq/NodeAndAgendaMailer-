const EmailJob = require('../models/emailJob');
const agenda = require('../config/agenda');
require('dotenv').config();

const createEmailJob = async (req, res) => {
  const { email, subject, body,scheduleTime } = req.body;
  try {
    // Set the scheduleTime to one minute from now
    // const scheduleTime = new Date(Date.now() + 60 * 1000);

    // Save Email Job to Database
    const newEmailJob = await EmailJob.create({ email, subject, body, scheduleTime });

    // Schedule Email Job using Agenda
    await agenda.schedule(scheduleTime, 'send-email', {
      email,
      subject,
      body,
    });

    console.log(`Job scheduled. Email will be sent in ${scheduleTime}.`);
    res.status(201).json({ message: 'Email job scheduled successfully', newEmailJob });
  } catch (error) {
    console.error('Error scheduling email job:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { createEmailJob };
