const chai = require('chai')
const sinon = require('sinon')
const fetch = require('node-fetch')
const { expect } = chai
const { getSecretFiles } = require('../service')

describe('getSecretFiles', () => {
  let fetchStub

  beforeEach(() => {
    fetchStub = sinon.stub(fetch, 'default')
  })

  afterEach(() => {
    fetchStub.restore()
  })

  it('debería retornar los datos correctamente', async () => {
    const fakeResponse = JSON.stringify({ files: ['file1', 'file2'] })
    fetchStub.resolves({
      text: () => Promise.resolve(fakeResponse)
    })

    const data = await getSecretFiles()
    expect(data).to.deep.equal({ files: ['file1', 'file2'] })
  })

  it('debería manejar errores correctamente', async () => {
    fetchStub.rejects(new Error('Network error'))

    try {
      await getSecretFiles()
    } catch (error) {
      expect(error.message).to.equal('Network error')
    }
  })
})
