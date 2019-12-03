const sgMail = require('@sendgrid/mail');

module.exports = {

  sendEmail: (conversationInfo) => {
    console.log(conversationInfo)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'caleb_1993_@hotmail.com',
      from: 'test@example.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
  }

}