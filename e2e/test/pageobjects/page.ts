import { browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';
import logger from '../utils/logger.js';

/**
 * Base page object: shared actions that also log what the test is doing.
 * Every page object extends this class.
 */
export default class Page {
  /** Opens a path relative to the baseUrl from wdio.conf.ts. */
  protected async openPath(path: string): Promise<void> {
    logger.info(`Opening ${path}`);
    await browser.url(path);
  }

  /** Waits until the element can be clicked, then clicks it. */
  protected async click(element: ChainablePromiseElement, description: string): Promise<void> {
    await element.waitForClickable();
    logger.info(`Clicking ${description}`);
    await element.click();
  }

  /** Types into an input. The value itself is never logged, because it may be a password. */
  protected async type(element: ChainablePromiseElement, value: string, description: string): Promise<void> {
    await element.waitForDisplayed();
    logger.info(`Typing into ${description}`);
    await element.setValue(value);
  }
}
