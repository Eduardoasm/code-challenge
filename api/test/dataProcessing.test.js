const { expect } = require('chai');
const sinon = require('sinon');
const { formatFiles } = require('../dataProcessing');
const fetch = require('node-fetch');

describe('formatFiles', function () {

  afterEach(function () {
    sinon.restore();
  });

  it('should format and return processed data', async function () {
    const fakeFileData = 'file,text,number,hex\nfile1.csv,someText,1234,abcd1234abcd1234abcd1234abcd1234\n';
    sinon.stub(fetch, 'Promise').returns(Promise.resolve({
      status: 200,
      text: () => Promise.resolve(fakeFileData)
    })) 
    const result = await formatFiles(['test.csv']);

    expect(result).to.be.an('array');

    result.forEach((file)=> {
      expect(file).to.have.property('file', 'file1.csv');
      file.lines.forEach((line) => {        
        expect(line).to.have.property('text', 'someText');
        expect(line).to.have.property('number', 1234);
        expect(line).to.have.property('hex', 'abcd1234abcd1234abcd1234abcd1234');
      })
    })

  });
});
