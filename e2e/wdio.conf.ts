export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./test/specs/**/*.ts'],

  // Browser drivers are downloaded automatically by WebdriverIO,
  // so nothing has to be installed on the machine except Node.js and the browser.
  capabilities: [{ browserName: 'chrome' }],

  baseUrl: 'https://solflare.com',
  logLevel: 'warn',
  waitforTimeout: 15_000,

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    timeout: 120_000,
  },
};
