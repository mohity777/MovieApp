module.exports = {
  presets: [[
      '@babel/preset-env',
      {
        'modules': 'commonjs'
      }
    ], 'module:metro-react-native-babel-preset'],
   plugins: [['@babel/plugin-proposal-class-properties', { 'loose' : true }]],
};
