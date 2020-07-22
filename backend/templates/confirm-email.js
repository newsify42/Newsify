const Mailgen = require("mailgen");
require("dotenv").config();

module.exports = (recipient, token) => {
  const mailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
      name: "Newsify",
      link: process.env.WEBSITE_URI, // link is required
    },
  });

  const email = {
    body: {
      name: recipient,
      intro:
        "You have received this email because an email verification request for your account was received.",
      action: {
        instructions: "Click the button below to confirm your email:",
        button: {
          color: "#FFC200",
          text: "Confirm your email",
          // Token is attached to the email with the appropriate endpoint
          link: `${process.env.WEBSITE_URI}:${process.env.PORT}/users/confirm_email/${token}`,
        },
      },
      outro:
        "If you did not request an email verification, no further action is required on your part.",
    },
  };

  return mailGenerator.generate(email);
};
