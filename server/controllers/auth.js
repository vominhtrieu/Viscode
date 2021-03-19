const config = require("../config/auth");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }
  });

  res.send({ message: "User was registered successfully!" });
};

module.exports.signIn = (req, res) => {
  console.log("log in");
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      res.status(401).send({
        accessToken: null,
        message: "Invalid password!"
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, config.secret);

    res.status(200).send({
      id: user._id,
      username: user.username,
      accessToken: token,
    });
  });
};
