const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../secrets/secrets");
const AuthModel = require("./auth-model");
const uniqueName = require("../middleware/uniqueName");
const { validateUser } = require("../middleware/validateUser");
const checkUserName = require("../middleware/checkUserName");

router.post("/register", validateUser, uniqueName, (req, res) => {
  const credentials = req.body;

  const hash = bcryptjs.hashSync(credentials.password, 10);
  credentials.password = hash;

  AuthModel.insert(credentials).then((user) => {
    res.status(201).json(user);
  });
});

router.post("/login", validateUser, checkUserName, (req, res) => {
  AuthModel.getByUsername(req.body.username).then((user) => {
    if (bcryptjs.compareSync(req.body.password, user[0].password)) {
      const token = makeToken(user[0]);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token,
      });
    } else {
      res.status(401).json("invalid credentials");
    }
  });
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1000s",
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
