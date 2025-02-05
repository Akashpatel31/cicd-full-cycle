import { expect } from 'chai';
import http from 'http';  // Native http module
import { app } from '../server.js';  // Import the app

describe('API Tests', () => {
  let server;

  // Start the server before tests
  before(() => {
    server = http.createServer(app);
    server.listen(3000);  // Start the server on port 3000
  });

  // Close the server after tests
  after(() => {
    server.close();
  });

  it('should return a message from the default route', (done) => {
    http.get('http://localhost:3000/', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(data);
        expect(res.statusCode).to.equal(200);
        expect(response.message).to.equal("Hello from Node.js is the best !");
        done();
      });
    });
  });

  it('should return an empty array initially from /data route', (done) => {
    http.get('http://localhost:3000/data', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(data);
        expect(res.statusCode).to.equal(200);
        expect(response).to.be.an('array').that.is.empty;
        done();
      });
    });
  });

  it('should store user-submitted data and return it', (done) => {
    const newData = { input: 'Test Data' };
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/data',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(newData)),
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(data);
        expect(res.statusCode).to.equal(200);
        expect(response).to.be.an('array');
        expect(response).to.include('Test Data');
        done();
      });
    });

    req.write(JSON.stringify(newData));
    req.end();
  });

  it('should return error when input is missing in POST /data', (done) => {
    const invalidData = {};  // Missing input
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/data',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(invalidData)),
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(data);
        expect(res.statusCode).to.equal(400);
        expect(response.error).to.equal('Input is required');
        done();
      });
    });

    req.write(JSON.stringify(invalidData));
    req.end();
  });
});
