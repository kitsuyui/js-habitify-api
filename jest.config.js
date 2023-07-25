module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testTimeout: 20000,
}
