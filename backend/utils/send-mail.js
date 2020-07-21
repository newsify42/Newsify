const nodemailer = require("nodemailer");

const getOAuthAccessToken = require("./get-oauth-access-token");

module.exports = async (recipient) => {
  let transportConfig;
  const testAccount = await nodemailer.createTestAccount(); // Ethereal account

  if (process.env.NODE_ENV === "prod") {
    // Retrieves the OAuth access token needed to send the emails
    const accessToken = getOAuthAccessToken();

    // Sets up a transport configuration with our OAuth details on the gmail
    // account
    transportConfig = {
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SENDER_EMAIL, // gmail account
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    };
  } else if (process.env.NODE_ENV === "dev") {
    // Sets up a transport configuration to the Ethereal site (fake SMTP
    // service)
    transportConfig = {
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated Ethereal user
        pass: testAccount.pass, // generated Ethereal password
      },
    };
  } else {
    throw httpError(500, "Choose Environment (NODE_ENV)");
  }

  const transporter = nodemailer.createTransport(transportConfig);

  const mailSchema = {
    from: `"Newsify" ${process.env.SENDER_EMAIL}`,
    to: recipient,
    subject: "Hello",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  };

  const info = await transporter.sendMail(mailSchema);

  // Prints the url for the Ethereal site (fake SMTP service) that receives
  // the confirmation email
  if (process.env.NODE_ENV === "dev") {
    console.log("Confirmation Email:", nodemailer.getTestMessageUrl(info));
  }
};
