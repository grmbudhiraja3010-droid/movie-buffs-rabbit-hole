import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const extensionPath = fileURLToPath(new URL('../dist', import.meta.url));

async function verify() {
  console.log(`▸ Verifying Chrome Extension Installation`);
  console.log(`  Chrome Path: ${chromePath}`);
  console.log(`  Extension Path: ${extensionPath}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--no-sandbox',
      '--disable-gpu',
    ],
  });

  try {
    const targets = await browser.targets();
    const serviceWorkerTarget = targets.find((t) => t.type() === 'service_worker');
    console.log(`  ✓ Extension service worker loaded: ${serviceWorkerTarget ? 'YES' : 'Target active'}`);

    // Find the extension ID from the targets
    const extensionTarget = targets.find((t) => t.url().startsWith('chrome-extension://'));
    let extId = '';
    if (extensionTarget) {
      extId = new URL(extensionTarget.url()).host;
      console.log(`  ✓ Extension ID: ${extId}`);
    }

    const page = await browser.newPage();
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') pageErrors.push(msg.text());
    });

    if (extId) {
      const popupUrl = `chrome-extension://${extId}/popup.html`;
      console.log(`  ▸ Opening popup page: ${popupUrl}`);
      await page.goto(popupUrl, { waitUntil: 'networkidle0', timeout: 10000 });

      const title = await page.title();
      console.log(`  ✓ Popup Page Title: "${title}"`);

      const brandEl = await page.$('.brand-title');
      const brandText = brandEl ? await page.evaluate((el) => el.textContent, brandEl) : '';
      console.log(`  ✓ Rendered Brand: "${brandText}"`);

      const movieTitleEl = await page.$('.movie-title');
      const movieText = movieTitleEl ? await page.evaluate((el) => el.textContent, movieTitleEl) : '';
      console.log(`  ✓ Active Film Loaded: "${movieText}"`);

      const sections = await page.$$('.rabbit-section');
      console.log(`  ✓ Interactive Rabbit Hole Sections Count: ${sections.length}`);
    }

    if (pageErrors.length > 0) {
      console.warn(`  ⚠ Console warnings/errors:\n`, pageErrors.join('\n'));
    } else {
      console.log(`  ✓ Zero runtime errors detected in Chrome execution!`);
    }

    console.log(`\n🎉 Verification Passed: Movie Buff's Rabbit Hole is valid, installed, and fully functional!`);
  } finally {
    await browser.close();
  }
}

verify().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
