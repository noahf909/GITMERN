module.exports = {
    testEnvironment: "node", // Use Node.js environment for backend testing
    rootDir: ".", // Root directory of your project
    testMatch: ["<rootDir>/tests/**/*.test.js"], // Match test files in the tests directory with .test.js extension
    coverageDirectory: "<rootDir>/coverage", // Directory for code coverage reports
    collectCoverage: true, // Enable coverage collection
    verbose: true, // Display individual test results
    moduleFileExtensions: ["js", "json", "node"], // Extensions of files Jest should process
  };
  