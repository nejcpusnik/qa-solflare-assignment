const WINDOW_WIDTH = 1440;
const WINDOW_HEIGHT = 900;

/** Builds the WebDriver capabilities (browser name and options) for one browser. */
export function buildCapability(browserName: string, headless: boolean): WebdriverIO.Capabilities {
  switch (browserName) {
    case 'chrome':
      return {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: [`--window-size=${WINDOW_WIDTH},${WINDOW_HEIGHT}`, ...(headless ? ['--headless=new'] : [])],
        },
      };
    case 'firefox':
      return {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: [`--width=${WINDOW_WIDTH}`, `--height=${WINDOW_HEIGHT}`, ...(headless ? ['-headless'] : [])],
        },
      };
    default:
      throw new Error(`Unsupported browser "${browserName}". Supported browsers: chrome, firefox.`);
  }
}
