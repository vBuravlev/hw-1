const config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'hw-1-1/utils/*.js',
    'hw-1-2/utils/*.js',
  ],
  coverageDirectory: "./reports",
};

module.exports = config;