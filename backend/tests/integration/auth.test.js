const request = require('supertest');
const mongoose = require('mongoose');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { User } = require('../../src/models');
const { baseUtil } = require('../../src/utils');
const { userOne, insertUsers, insertUserToken } = require('../fixtures/user.fixture');

const headers = {
  Accept: 'application/json',
  'x-platform': 'ANDROID',
};

setupTestDB();

describe('Auth routes', () => {
  describe('POST /auth/register', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        username: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
      };
    });

    test('should return 201 and successfully register user if request data is ok', async () => {
      const res = await request(app).post('/auth/register').set(headers).send(newUser).expect(httpStatus.CREATED);

      expect(res.body).toEqual({ message: 'Register is success' });

      let dbUser = await User.findOne({ username: newUser.username });
      expect(dbUser).toBeDefined();
      dbUser = await User.findOne({ email: newUser.email });
      expect(dbUser).toBeDefined();
    });

    test('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';

      await request(app).post('/auth/register').set(headers).send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 409 error if email is already used', async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(app).post('/auth/register').set(headers).send(newUser).expect(httpStatus.CONFLICT);
    });

    test('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';

      await request(app).post('/auth/register').set(headers).send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password does not contain both letters and numbers', async () => {
      newUser.password = 'password';

      await request(app).post('/auth/register').set(headers).send(newUser).expect(httpStatus.BAD_REQUEST);

      newUser.password = '11111111';

      await request(app).post('/auth/register').set(headers).send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('POST /auth/login', () => {
    test('should return 200 and login user if email and password match', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .post('/auth/login')
        .set(headers)
        .send({
          username: userOne.username,
          password: userOne.password,
        })
        .expect(httpStatus.OK);

      expect(res.body.user).toHaveProperty('username', userOne.username);
      expect(res.body.user).toHaveProperty('email', userOne.email);
      expect(res.body).toHaveProperty('token');
    });

    test('should return 400 error if there are no users with that email', async () => {
      const loginCredentials = {
        username: userOne.email,
        password: userOne.password,
      };

      const res = await request(app).post('/auth/login').set(headers).send(loginCredentials).expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({ code: httpStatus.BAD_REQUEST, message: 'Wrong email or password' });
    });

    test('should return 400 error if password is wrong', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        username: userOne.email,
        password: 'wrongPassword1',
      };

      const res = await request(app).post('/auth/login').set(headers).send(loginCredentials).expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({ code: httpStatus.BAD_REQUEST, message: 'Wrong email or password' });
    });
  });

  describe('POST /auth/logout', () => {
    test('should return 401 error if authentication is not found in the database', async () => {
      const userToken = baseUtil.sha1(Date.now().toString());

      await request(app)
        .post('/auth/logout')
        .set({
          authorization: userToken,
          ...headers,
        })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('POST /auth/changePassword', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        _id: mongoose.Types.ObjectId(),
        username: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.random.alphaNumeric(25),
      };
    });
    test('should return 400 error if password length is less than 8 characters', async () => {
      const userToken = baseUtil.sha1(Date.now().toString());
      await insertUsers([newUser]);
      await insertUserToken(newUser._id, userToken);

      headers.authorization = userToken;
      await request(app)
        .post('/auth/changePassword')
        .set(headers)
        .send({
          password: 'passwo',
        })
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 200 if password is changed', async () => {
      const userToken = baseUtil.sha1(Date.now().toString());
      await insertUsers([newUser]);
      await insertUserToken(newUser._id, userToken);
      const password = faker.random.alphaNumeric(27);

      let dbUser = await User.findById(newUser._id);
      expect(dbUser).toBeDefined();

      const oldPassword = dbUser.password;

      headers.authorization = userToken;
      const res = await request(app)
        .post('/auth/changePassword')
        .set(headers)
        .send({
          password,
        })
        .expect(200);

      expect(res.body).toEqual({ message: 'Your password has changed successfully' });

      dbUser = await User.findById(newUser._id);
      expect(dbUser).toBeDefined();

      const isPasswordMatch = oldPassword === dbUser.password;
      expect(isPasswordMatch).toEqual(true);
    });
  });
});
