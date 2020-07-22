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
        "You have received this email because a password reset request for your account was received.",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#DC4D2F",
          text: "Reset your password",
          // Token is attached to the email with the appropriate endpoint
          link: `${process.env.WEBSITE_URI}:${process.env.PORT}/users/reset_password/${token}`,
        },
      },
      outro:
        "If you did not request a password reset, no further action is required on your part.",
    },
  };

  return mailGenerator.generate(email);
};
