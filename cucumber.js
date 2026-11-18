module.exports = {
  default: {
    setDefaultTimeout: 30000,
    paths: [
      'features/**/*.feature',
      
    ],

    require: [
      'steps/**/*.ts',
      'supports/**/*.ts'
    ],

    requireModule: [
      'ts-node/register'
    ],

    format: [
      'progress'
    ]
  }
};