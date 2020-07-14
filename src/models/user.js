const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const path = require('path');

const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/');
const usersFilePath = path.join(__dirname, './users.json');

const authenticateUser = async ({ id, email, password }) => {
  const user = await findUser({ email });
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordValid) {
    throw new Error('Unable to login');
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { token };
};

const createUser = async ({ email, name, password }) => {
  const data = await fs.readFile(usersFilePath);
  const users = JSON.parse(data);
  const user = await findUser({ email });

  if (user) {
    throw new Error('Email already exists!');
  }

  const newUser = {
    id: users.length + 1,
    email,
    name,
    password: await bcrypt.hash(password, 10),
  };

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  users.push(newUser);

  await fs.writeFile(usersFilePath, JSON.stringify(users));

  return { token };
};

const findUser = async ({ id, email }) => {
  const data = await fs.readFile(usersFilePath);
  const users = JSON.parse(data);

  const existingUser = users.find(
    user => user.id === id || user.email === email
  );

  return existingUser;
};

module.exports = {
  authenticateUser,
  createUser,
  findUser,
};