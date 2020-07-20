const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;

function checkValidObjectId(id, res) {
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "ObjectID is not valid",
    });
  }
}

function verifyCookieExists(cookieName, req, res) {
  if (!(cookieName in req.cookies)) {
    return res.status(404).json({
      message: "Cookie not found",
    });
  }
}

async function verifyPasswordsMatch(pass1, pass2, res) {
  try {
    const isMatch = await bcrypt.compare(pass1, pass2);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}
