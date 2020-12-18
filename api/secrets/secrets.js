const jwtSecret =
  process.env.JWT_SECRET || "can you keep a secret";

module.exports = {
  jwtSecret,
};
