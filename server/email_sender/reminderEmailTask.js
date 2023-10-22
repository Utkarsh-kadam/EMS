const moment = require('moment');
const nodemailer = require('nodemailer');
const Event = require('../db/eventModel');
const Registration = require('../db/eventRegistrationModel');
const User = require('../db/userModel');
const emailTemplate = require('./emailTemplate');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ems.remind.user@gmail.com',
    pass: 'ririurxmgkyiaewx',
  },
});

// Find events starting within the next hour
const now = moment();
const oneHourLater = moment().add(1, 'hour');

async function sendEventReminders() {
  try {
    const events = await Event.find({
      startDate: {
        $gte: now.toDate(),
        $lt: oneHourLater.toDate(),
      },
    });

    for (const event of events) {
      const registrants = await Registration.find({ eventId: event._id });

      for (const registrant of registrants) {
        const user = await User.findById(registrant.userId);

        if (user) {
          const emailContent = emailTemplate.generateReminderEmail(event, user);

          const mailOptions = {
            from: 'ems.remind.user@gmail.com',
            to: user.email,
            subject: 'Event Reminder',
            html: emailContent,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Error finding upcoming events:', error);
  }
}

sendEventReminders();
