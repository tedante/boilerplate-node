const request = require('supertest');
const app = require('../app');
const { User, sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  
  let roles = require('../seeders/data/roles.json').map(role => {
    return {
      ...role,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })

  await sequelize.queryInterface.bulkInsert('Roles', roles, {});

  let users = require('../seeders/data/users.json').map(user => {
    return {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })
  
  await sequelize.queryInterface.bulkInsert('Users', users, {});
})

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Roles", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe('Auth API', () => {
  test('check server active', () => {
    return request(app)
            .get('/ping')
            .expect(200)
            .then((res) => {
              expect(res.status).toBe(200);
            })
  })

  test('Should register a new user', () => {
    let requestBody = {
      "name": "testregister",
      "email": "testregister@yopmail.com",
      "password": "testtest"
    }

    return request(app)
            .post('/auth/register')
            .send(requestBody)
            .expect(201)
            .then(({status, body}) => {
              expect(status).toBe(201);
              expect(body.data).toHaveProperty('email', requestBody.email);
            })
  })

  test('Should not register a new user with existing email', () => {
    let requestBody = {
      "name": "testregister",
      "email": "testregister@yopmail.com",
      "password": "testtest"
    }

    return request(app)
            .post('/auth/register')
            .send(requestBody)
            .expect(400)
            .then(({status, body}) => {
              expect(status).toBe(400);
              expect(body.message).toBe('Email already exists');
            })
  })
});