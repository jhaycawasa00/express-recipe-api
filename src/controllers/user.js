const { createUser, authenticateUser } = require('../models/user');

const handleSignup = async (req, res, next) => {
  try {
    const { token } = await createUser(req.body);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const handleLogin = async (req, res, next) => {
  try {
    const { token } = await authenticateUser(req.body);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleSignup,
  handleLogin,
};