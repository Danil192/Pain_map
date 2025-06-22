module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/__mocks__/svgMock.js"
  }
};
