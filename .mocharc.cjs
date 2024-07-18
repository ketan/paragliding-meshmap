module.exports = {
  extension: ['ts'],
  spec: 'test/**/*.spec.ts',
  require: ['ts-node/register', './test/hooks.ts'],
  'node-option': ['experimental-specifier-resolution=node', 'loader=ts-node/esm'],
}
