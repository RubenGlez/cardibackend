import request from 'supertest'

import api, { mongoInstance } from '../../src/apiForTests'

describe('POST /signup', () => {
  beforeAll(async () => {
    await mongoInstance.connect()
  })

  afterAll(async () => {
    await mongoInstance.disconnect()
  })
  
  test('Should return a 200', async () => {
    const timestamp = new Date().getTime()
    const response = await request(api)
      .post('/api/v1/common/auth/signup')
      .send({
        email: `basicTestUser_${timestamp}@gmail.com`,
        password: '1234',
        username: `basicTestUser_${timestamp}`,
        role: 'Basic'
      })

    expect(response.statusCode).toEqual(200)
  })

  test('Should return a 200 again', async () => {
    const timestamp = new Date().getTime()
    const response = await request(api)
      .post('/api/v1/common/auth/signup')
      .send({
        email: `basicTestUser_${timestamp}@gmail.com`,
        password: '1234',
        username: `basicTestUser_${timestamp}`,
        role: 'Basic'
      })

    expect(response.statusCode).toEqual(200)
  })
})
