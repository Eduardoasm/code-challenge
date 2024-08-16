const { expect } = require('chai');
const sinon = require('sinon');
const fetch = require('node-fetch');
const service = require('../service');

describe('getSecretFiles', function () {

  afterEach(function () {
    sinon.restore();
  });
  
  it('should throw an error if fetch is fails', async function () {
    sinon.stub(fetch, 'Promise').returns(Promise.reject())
    try {
      await service.getSecretFiles();
    } catch (error) {
      expect(error.message).to.include('Error to fetch secret files');
    }
  });
  
  it('should return parsed JSON when fetch is successful', async function () {
    const fakeResponse = JSON.stringify(['file1.csv']);
    sinon.stub(fetch, 'Promise').returns(Promise.resolve({
      status: 200,
      text: () => Promise.resolve(fakeResponse)
    })) 
      const response = await service.getSecretFiles();

      expect(response).to.be.an('array');
      expect(response).to.include('file1.csv');
  });
})

describe('downloadSecretFile', function () {

  afterEach(function () {
    sinon.restore();
  });
  
  it('should return parsed JSON when fetch is successful', async function () {
    const fakeFileData = 'file,text,number,hex\nfile1,someText,1234,abcd1234abcd1234abcd1234abcd1234\n';
    sinon.stub(fetch, 'Promise').returns(Promise.resolve({
      status: 200,
      text: () => Promise.resolve(fakeFileData)
    })) 
    const response = await service.downloadSecretFile();

    expect(response).to.be.a('string');
    expect(response).to.include('file');
    expect(response).to.include('text');
    expect(response).to.include('number');
    expect(response).to.include('hex');
    expect(response).to.include('file1');
    expect(response).to.include('someText');
    expect(response).to.include('1234');
    expect(response).to.include('abcd1234abcd1234abcd1234abcd1234');
  });

})