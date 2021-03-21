const User = require("../models/User");

const checkDuplicateUsername = async (req, res, next) => {
  //Username
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
  next();
};

const verifySignUp = {
    checkDuplicateUsername
};

module.exports = verifySignUp;
