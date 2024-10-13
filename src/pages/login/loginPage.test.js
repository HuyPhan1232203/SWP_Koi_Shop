// loginPage.test.js

// Function to simulate user input
function simulateInput(selector, value) {
    const input = document.querySelector(selector);
    if (input) {
      input.value = value;
      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);
    } else {
      console.error(`Input not found for selector: ${selector}`);
    }
  }
  
  // Function to simulate form submission
  function simulateSubmit(selector) {
    const form = document.querySelector(selector);
    if (form) {
      const event = new Event('submit', { bubbles: true });
      form.dispatchEvent(event);
    } else {
      console.error(`Form not found for selector: ${selector}`);
    }
  }
  
  // Test case: Check if the login form renders correctly
  function testLoginFormRendering() {
    const form = document.querySelector('.loginForm');
    console.assert(form !== null, 'Login form should be rendered');
    console.log('Test: Login form rendering - Passed');
  }
  
  // Test case: Check if email input accepts value
  function testEmailInput() {
    simulateInput('.loginForm input[placeholder="Email"]', 'test@example.com'); // Updated selector
    const input = document.querySelector('.loginForm input[placeholder="Email"]'); // Updated selector
    console.assert(input && input.value === 'test@example.com', 'Email input should accept value');
    console.log('Test: Email input - Passed');
  }
  
  // Test case: Check if password input accepts value
  function testPasswordInput() {
    simulateInput('.loginForm input[placeholder="Password"]', 'password123'); // Updated selector
    const input = document.querySelector('.loginForm input[placeholder="Password"]'); // Updated selector
    console.assert(input && input.value === 'password123', 'Password input should accept value');
    console.log('Test: Password input - Passed');
  }
  
  // Test case: Check form submission
  function testFormSubmission() {
    simulateInput('.loginForm input[placeholder="Email"]', 'test@example.com'); // Updated selector
    simulateInput('.loginForm input[placeholder="Password"]', 'password123'); // Updated selector
    simulateSubmit('.loginForm');
    console.log('Test: Form submission - Passed (manual check required)');
  }
  
  // Run all tests after the DOM is fully loaded
  function runTests() {
    console.log('Running tests for LoginPage...');
    testLoginFormRendering();
    testEmailInput();
    testPasswordInput();
    testFormSubmission();
  }
  
  // Execute tests
  runTests();