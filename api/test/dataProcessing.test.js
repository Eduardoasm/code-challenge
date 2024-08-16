const { expect } = require('chai');
const sinon = require('sinon');
const { formatFiles, unformattedFiles } = require('../dataProcessing.js');
const service = require('../service.js');

describe('formatFiles', function () {
  let downloadStub;

  beforeEach(() => {
    downloadStub = sinon.stub(service, 'downloadSecretFile');
  });

  afterEach(() => {
    downloadStub.restore();
  });

  it('should format and return processed data', async function () {
    const fakeFileData = 'file,text,number,hex\nfile1,someText,1234,abcd1234abcd1234abcd1234abcd1234\n';
    downloadStub.resolves(fakeFileData);
    console.log("downloadStu fakefileadatb", downloadStub())
    const result = await formatFiles(['test.csv']);
    expect(result).to.be.an('array');
    expect(result[0]).to.have.property('file', 'file1');
  });

  it('should skip files that cannot be downloaded', async function () {
    downloadStub.resolves(null);
    console.log("downloadStub downlaoded", downloadStub())
    const result = await formatFiles(['nonexistent.csv']);
    expect(result).to.be.an('array').that.is.empty;
  });
});

// describe('unformattedFiles', function () {
//   let downloadStub;

//   beforeEach(() => {
//     downloadStub = sinon.stub(service, 'downloadSecretFile');
//   });

//   afterEach(() => {
//     downloadStub.restore();
//   });

//   it('should return raw data as an array of objects', async function () {
//     const fakeFileData = 'file,text,number,hex\nfile1,someText,1234,abcd1234abcd1234abcd1234abcd1234\n';
//     downloadStub.resolves(fakeFileData);

//     const result = await unformattedFiles(['test.csv']);
//     expect(result).to.be.an('array');
//     expect(result[0]).to.have.property('file', 'file1');
//   });

//   it('should skip files that cannot be downloaded', async function () {
//     downloadStub.resolves(null);

//     const result = await unformattedFiles(['nonexistent.csv']);
//     expect(result).to.be.an('array').that.is.empty;
//   });
// });
