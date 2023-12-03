const request = require('supertest');
const app = require('../app');
const syncDatabase = require('./database');
const { generateJWT } = require("../helpers/jwt");

beforeAll(async () => {
  await syncDatabase.sync()

  await syncDatabase.seed()
})

afterAll(async () => {
  await syncDatabase.clean()
});

describe('Roles API', () => {
  let prefix = '/roles'
  let admin = syncDatabase.getAdmin()
  let accessToken = generateJWT({
    id: admin.id,
    email: admin.email,
  });
  
  test('check server active', () => {
    return request(app)
            .get('/ping')
            .expect(200)
            .then((res) => {
              expect(res.status).toBe(200);
            })
  })

  test('Should get all roles', () => {
    return request(app)
            .get(prefix)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
            .then(({status, body}) => {
              expect(status).toBe(200);
              expect(body).toBeInstanceOf(Object);
              expect(body.data).toBeInstanceOf(Array);
              expect(body.data.length).toBeGreaterThan(0);
            })
  })
  
  test('Should not get all roles without access token', () => {
    return request(app)
            .get(prefix)
            .expect(401)
            .then(({status, body}) => {
              expect(status).toBe(401);
              expect(body).toBeInstanceOf(Object);
              expect(body.code).toBe(401);
              expect(body.message).toBe('NOT_AUTHORIZED');
            })
  })

  test('Should not get all roles with access token not valid', () => {
    return request(app)
            .get(prefix)
            .set('Authorization', `Bearer ${accessToken}123`)
            .expect(401)
            .then(({status, body}) => {
              expect(status).toBe(401);
              expect(body).toBeInstanceOf(Object);
              expect(body.code).toBe(401);
              expect(body.message).toBe('NOT_AUTHORIZED');
            })
  })
})