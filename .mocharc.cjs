process.env.NODE_ENV = 'test'

require('dotenv-flow/config')

module.exports = {
  extension: ['ts'],
  spec: 'test/**/*.spec.ts',
  require: ['ts-node/register', './test/hooks.ts'],
  'node-option': ['experimental-specifier-resolution=node', 'loader=ts-node/esm'],
  timeout: 5000,
  jobs: 1,
}
