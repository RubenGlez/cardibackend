const cardiApp = {
  isCool: true,
  willBeFinished: false
}

describe('cardi app', () => {
  test('is cool', () => {
    expect(cardiApp.isCool).toBeTruthy()
  })

  test('will be finished anytime', () => {
    expect(cardiApp.willBeFinished).toBeFalsy()
  })
})
