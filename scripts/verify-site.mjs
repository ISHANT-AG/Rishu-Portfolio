import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    const ws = new WebSocket(this.wsUrl);
    this.ws = ws;
    return new Promise((resolve, reject) => {
      ws.onopen = () => resolve();
      ws.onerror = (err) => reject(err);
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) {
            cb.reject(new Error(msg.error.message));
          } else {
            cb.resolve(msg.result);
          }
        } else if (msg.method === 'Runtime.consoleAPICalled') {
          console.log(`[BROWSER CONSOLE] ${msg.params.type}:`, ...msg.params.args.map((a) => a.value ?? a.description));
        } else if (msg.method === 'Runtime.exceptionThrown') {
          console.error(`[BROWSER ERROR]`, msg.params.exceptionDetails);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function runVerification() {
  console.log('Starting headless Chrome...');
  const chrome = spawn(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    [
      '--headless=new',
      '--remote-debugging-port=9222',
      '--disable-gpu',
      '--no-sandbox',
      'about:blank',
    ]
  );

  await wait(1500);

  try {
    const list = await getJSON('http://127.0.0.1:9222/json');
    const page = list.find((p) => p.type === 'page');
    if (!page) throw new Error('No page found in Chrome');

    console.log('Connected to Chrome via CDP');
    const client = new CDPClient(page.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    // 1. Desktop Test (1440x900)
    console.log('\n--- 1. Testing Desktop (1440x900) Opening Stage ---');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await client.send('Page.navigate', { url: 'http://localhost:3001/' });
    await wait(2000);

    // Capture Opening Stage
    let shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-stage-desktop.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-stage-desktop.png');

    // Switch Category to Bridal
    console.log('Testing category switch: Bridal...');
    await client.send('Runtime.evaluate', {
      expression: `
        const btns = Array.from(document.querySelectorAll('button[role="tab"]'));
        const bridal = btns.find(b => b.textContent.includes('Bridal'));
        if (bridal) bridal.click();
      `,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-stage-bridal.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-stage-bridal.png');

    // Switch View Mode to Grid
    console.log('Testing view mode toggle: Grid...');
    await client.send('Runtime.evaluate', {
      expression: `
        const gridBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Grid'));
        if (gridBtn) gridBtn.click();
      `,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-grid-mode.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-grid-mode.png');

    // Test Opening Inspection Modal from Grid
    console.log('Testing photo click to open inspection modal...');
    await client.send('Runtime.evaluate', {
      expression: `
        const firstCard = document.querySelector('article');
        if (firstCard) firstCard.click();
      `,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-inspection-modal.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-inspection-modal.png');

    // Press Escape to close modal
    console.log('Pressing Escape to close modal...');
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
    await wait(600);

    // Switch back to Explore mode
    console.log('Switching back to Explore mode...');
    await client.send('Runtime.evaluate', {
      expression: `
        const exploreBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Explore'));
        if (exploreBtn) exploreBtn.click();
      `,
    });
    await wait(600);

    // Scroll to Bridal Feature
    console.log('Scrolling to #bridal...');
    await client.send('Runtime.evaluate', {
      expression: `document.querySelector('#bridal')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-bridal-feature.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-bridal-feature.png');

    // Scroll to About & Details
    console.log('Scrolling to #about...');
    await client.send('Runtime.evaluate', {
      expression: `document.querySelector('#about')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-about-details.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-about-details.png');

    // Scroll to Contact
    console.log('Scrolling to #contact...');
    await client.send('Runtime.evaluate', {
      expression: `document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-contact-section.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-contact-section.png');

    // 2. Mobile Viewport (390x844)
    console.log('\n--- 2. Testing Mobile (390x844) ---');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true,
    });
    await client.send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 0, behavior: 'instant' });`,
    });
    await wait(1000);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-mobile-stage.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-mobile-stage.png');

    console.log('\nAll verification tests completed successfully!');
  } finally {
    chrome.kill();
  }
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
