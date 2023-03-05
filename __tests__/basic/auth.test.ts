import * as http from 'http'

import request from 'supertest'

import app from '../../src/index'

describe('Auth endpoints', () => {
  let appInstance: http.Server | undefined

  beforeAll(async () => {
    appInstance = await app
  })

  afterAll(async () => {
    appInstance?.close()
  })

  // POST: http://localhost:3000/api/v1/common/auth/signup
  test('Signup for basic user works', async () => {
    const timestamp = new Date().getTime()
    const res = await request(appInstance)
      .post('/api/v1/common/auth/signup')
      .send({
        email: `basicTestUser_${timestamp}@gmail.com`,
        password: '1234',
        username: `basicTestUser_${timestamp}`,
        role: 'Basic'
      })

    expect(res.status).toEqual(200)
    expect(res.body.userId).toBeTruthy()
    expect(res.body.accessToken).toBeTruthy()
    expect(res.body.userRole).toEqual('Basic')
  })
})
