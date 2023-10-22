
module.exports = {
    generateReminderEmail: (event, user) => {
      return `
        <html>
        <head></head>
        <body>
          <p>Hello ${user.name},</p>
          <p>Just a reminder that the event ${event.name} is starting in one hour.</p>
          <p>Event details:</p>
          <ul>
            <li>Name: ${event.name}</li>
            <li>Date: ${event.startDate}</li>
            <li>Venue: ${event.venue}</li>
          </ul>
          <p>Enjoy the event!</p>
        </body>
        </html>
      `;
    },
  };
  