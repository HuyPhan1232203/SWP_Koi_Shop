// loginApi.test.js

import http from 'http';

const options = {
  hostname: '103.200.20.221',
  port: 8080,
  path: '/api/login', // Adjust this line if your login endpoint is different
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Sample login data - replace with valid credentials for testing
const loginData = JSON.stringify({
  email: 'huy@gmail.com', // Change to a valid email for your tests
  password: 'string',   // Change to a valid password for your tests
});

// Function to test the login API
const testLoginApi = () => {
  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Response:', data);
      if (res.statusCode === 200) {
        console.log('Login API test passed!');
      } else {
        console.log('Login API test failed with status code:', res.statusCode);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  // Write data to request body
  req.write(loginData);
  req.end();
};

// Run the test
testLoginApi();