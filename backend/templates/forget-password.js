const Mailgen = require("mailgen");

module.exports = (recipient) => {
  const mailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
      name: "Newsify",
      link: "http://localhost:5000", // link is required
    },
  });

  // Prepare email contents
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
          link: "http://localhost:5000/confirm_email",
        },
      },
      outro:
        "If you did not request a password reset, no further action is required on your part.",
    },
  };

  return mailGenerator.generate(email);
};
