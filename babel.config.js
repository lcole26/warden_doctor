module.exports = {
  presets: [
    // eslint-disable-next-line prettier/prettier
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};
