const User = require("../models/user.model");

exports.verifyEmailDoesNotExist = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({
        message: "Email already found",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.verifyUserExistsByEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.verifyUserExistsById = async (req, res, next) => {
  try {
    checkValidObjectId(req.id, res);

    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};
