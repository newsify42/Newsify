const OAuth2 = require("googleapis").google.auth.OAuth2;
require("dotenv").config();

module.exports = () => {
  // Sets up the OAuth2 Client
  const myOAuth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET
  );

  myOAuth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  // Returns the access token that changes periodically
  return myOAuth2Client.getAccessToken();
};
