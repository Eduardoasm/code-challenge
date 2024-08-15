const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai
const server = require('../index.js') // Asegúrate de que esta ruta apunte a tu archivo de entrada de Express
const sinon = require('sinon')
const service = require('../service.js')

chai.use(chaiHttp)

describe('GET /files/data', function () {
  it('should fetch data and return status 200', function (done) {
    chai.request(server)
      .get('/files/data')
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.status(200)
        expect(res.body.data).to.be.an('array')
        done()
      })
  })

  // it('should return status 500 on server Error', function(done) {
  //   const stub = sinon.stub(service, 'getSecretFiles').rejects(new Error('Simulated server error'))
  //   chai.request(server)
  //     .get('/files/data')
  //     .end(function(err, res) {
  //       expect(res).to.have.status(500);
  //       expect(res.body).to.have.property('message', 'Internal server error')
  //       expect(res.body).to.have.property('success', 'false')
  //       stub.restore();
  //       done();
  //     });
  // });
})
