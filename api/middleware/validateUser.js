module.exports = {
  validateUser,
};

function validateUser(req, res, next) {
  if (!req.body.password || !req.body.username) {
    res.status(401).json("username and password required");
  } else {
    next();
  }
}
