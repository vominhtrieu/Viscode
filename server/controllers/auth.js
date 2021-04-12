const config = require("../config/auth");
const User = require("../models/User");
const Folder = require("../models/Folder");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenList = {};

module.exports.signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save(async (err, user) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }
    try {
      await Folder.create({ name: "root", user: user._id });
    } catch (err) {
      console.log("Error: ", err);
    }
  });

  res.send({ message: "User was registered successfully!" });
};

module.exports.signIn = (req, res) => {
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
        message: "Invalid password!",
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, config.tokenSecret, {
      expiresIn: config.tokenLife,
    });

    const refreshToken = jwt.sign({ id: user.id }, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenLife,
    });

    tokenList[refreshToken] = user.id;

    res.status(200).send({
      id: user._id,
      username: user.username,
      accessToken: token,
      refreshToken: refreshToken,
    });
  });
};

module.exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken && refreshToken in tokenList) {
    jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Invalid refresh token" });
      }
      const userId = tokenList[refreshToken];

      const token = jwt.sign({ id: userId }, config.tokenSecret, {
        expiresIn: config.tokenLife,
      });

      res.status(200).send({ accessToken: token });
    });
  } else {
    res.status(400).json({
      message: "Invalid request",
    });
  }
};
