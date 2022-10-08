const config = {
    preset: 'react-native',
     transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
    transformIgnorePatterns: ['node_modules/(?!react-native)/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
};

module.exports = config;
