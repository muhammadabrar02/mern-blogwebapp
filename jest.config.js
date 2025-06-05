// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // This is necessary for React to work in Jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // For handling TypeScript files
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // If you're using path aliases in your Next.js project
  },
}
