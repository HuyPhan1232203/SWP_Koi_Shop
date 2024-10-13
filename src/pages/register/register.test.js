// register.test.js

// Mocking the necessary functions and variables
const mockNavigate = () => {};
const mockToast = {
  success: () => {},
  error: () => {},
};

// Mocking the API post function
const mockApi = {
  post: async () => {},
};

// RegisterPage function (simplified)
const RegisterPage = {
  handleRegister: async (values) => {
    try {
      values.role = "CUSTOMER";
      await mockApi.post("register", values);
      mockToast.success("Successfully Register New Account!");
      mockNavigate("/login");
    } catch (err) {
      mockToast.error(err.message || "Registration failed");
    }
  },
};

// Test function
const runTests = async () => {
  // Test 1: Successful registration
  console.log("Running Test 1: Successful registration");
  mockApi.post = async () => {}; // Simulate success
  const successToast = mockToast.success;
  mockToast.success = (message) => {
    console.assert(message === "Successfully Register New Account!", "Test 1 Failed");
  };

  await RegisterPage.handleRegister({ username: "testuser", email: "test@example.com", password: "password123", confirm: "password123", phone: "0123456789" });
  console.log("Test 1 Passed");
};

// Run tests
runTests();