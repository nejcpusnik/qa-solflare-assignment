import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { browser } from '@wdio/globals';
import logger from './logger.js';

const SCREENSHOT_DIRECTORY = path.resolve(process.cwd(), 'screenshots');

/** Turns any text into a safe file name part, e.g. "Should add 3rd wallet" -> "should-add-3rd-wallet". */
function toFileName(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

/**
 * Saves a screenshot of the current browser window for a failed test.
 * Called from the afterTest hook in wdio.conf.ts, so it works for every spec.
 */
export async function saveFailureScreenshot(testTitle: string): Promise<void> {
  mkdirSync(SCREENSHOT_DIRECTORY, { recursive: true });

  const browserName = (browser.capabilities as WebdriverIO.Capabilities).browserName ?? 'browser';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(SCREENSHOT_DIRECTORY, `${toFileName(testTitle)}_${browserName}_${timestamp}.png`);

  try {
    await browser.saveScreenshot(filePath);
    logger.error(`Screenshot saved: ${filePath}`);
  } catch (error) {
    // A screenshot problem must never hide the original test failure.
    logger.error(`Could not save screenshot: ${(error as Error).message}`);
  }
}
