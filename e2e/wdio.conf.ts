import logger from './test/utils/logger.js';
import { saveFailureScreenshot } from './test/utils/screenshot.js';

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

  beforeTest: function (test) {
    logger.info(`START: ${test.parent} - ${test.title}`);
  },

  // Generic failure handling: every failed test gets a screenshot, whatever the spec.
  afterTest: async function (test, _context, { passed, error }) {
    if (passed) {
      logger.info(`PASSED: ${test.title}`);
      return;
    }
    logger.error(`FAILED: ${test.title} - ${error?.message ?? 'unknown error'}`);
    await saveFailureScreenshot(test.title);
  },
};
