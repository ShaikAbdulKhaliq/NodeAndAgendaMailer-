const mongoose = require('mongoose');

const emailJobSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  scheduleTime: { type: Date, required: true },
});

module.exports = mongoose.model('EmailJob', emailJobSchema);