const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const { User, UserToken } = require('../../src/models');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  username: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  username: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password,
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

const insertUserToken = async (user, tokenCode) => {
  await UserToken.create({
    user,
    tokenCode,
  });
};

module.exports = {
  userOne,
  userTwo,
  insertUsers,
  insertUserToken,
};
