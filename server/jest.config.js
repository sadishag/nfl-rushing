module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'jsx'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/docs/',
    '<rootDir>/build/',
    '<rootDir>/src/index.js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/docs/',
    '<rootDir>/build/',
    '<rootDir>/src/index.js'
  ],
  collectCoverageFrom: ['src/**']
};
