module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-function-bind',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'smart' }],
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-partial-application',
  ]
};
