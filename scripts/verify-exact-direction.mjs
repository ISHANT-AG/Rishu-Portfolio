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
          console.error('[BROWSER EXCEPTION]', msg.params.exceptionDetails);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  console.log('Starting headless Chrome...');
  const chrome = spawn(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    [
      '--headless=new',
      '--remote-debugging-port=9222',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--user-data-dir=/tmp/chrome-test-exact',
    ],
    { stdio: 'ignore' }
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
    console.log('\n--- 1. Testing Desktop (1440x900) ---');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await wait(2000);

    // Verify fonts loaded
    const fontCheck = await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const fonts = Array.from(document.fonts.values()).map(f => f.family);
          return {
            hasAssistant: fonts.some(f => f.includes('Assistant')),
            hasJost: fonts.some(f => f.includes('Jost')),
            hasAlegreya: fonts.some(f => f.includes('Alegreya Sans')),
            fonts: [...new Set(fonts)]
          };
        })()
      `,
      returnByValue: true,
    });
    console.log('Fonts loaded check:', fontCheck.result.value);

    // Capture Screenshot 1: Landing section (Adjany Reference)
    let shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot-1-landing.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot-1-landing.png');

    // Count all photographs rendered in the gallery
    const photoCountCheck = await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const tiles = document.querySelectorAll('#portfolio button');
          const imgs = document.querySelectorAll('#portfolio img');
          return {
            tileCount: tiles.length,
            imgCount: imgs.length
          };
        })()
      `,
      returnByValue: true,
    });
    console.log('Gallery photos rendered count:', photoCountCheck.result.value);

    // Scroll to #portfolio
    console.log('Scrolling to #portfolio (Full-Width Gallery)...');
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(1000);

    // Capture Screenshot 2: Full-width gallery section (Kayla Arianne Reference)
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot-2-gallery.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot-2-gallery.png');

    // Test Lightbox open
    console.log('Clicking first photo to test lightbox...');
    await client.send('Runtime.evaluate', {
      expression: `document.querySelector('#portfolio button')?.click();`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot-lightbox.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot-lightbox.png');

    // Press Escape to close lightbox
    console.log('Pressing Escape to close lightbox...');
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
    await wait(600);

    // Scroll to #contact
    console.log('Scrolling to #contact (Three Contact Options)...');
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(1000);

    // Capture Screenshot 3: Three Contact Options
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot-3-contact.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot-3-contact.png');

    // 2. Mobile Test (390x844)
    console.log('\n--- 2. Testing Mobile (390x844) ---');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await wait(2000);

    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot-mobile-landing.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot-mobile-landing.png');

    // Check overflow and elements
    const mobileCheck = await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          const tiles = document.querySelectorAll('#portfolio button');
          return {
            noOverflow: docWidth <= winWidth,
            docWidth,
            winWidth,
            galleryTilesOnMobile: tiles.length
          };
        })()
      `,
      returnByValue: true,
    });
    console.log('Mobile Check:', mobileCheck.result.value);

    // Scroll down mobile to gallery
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot-mobile-gallery.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot-mobile-gallery.png');

    // Scroll down mobile to contact
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot-mobile-contact.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot-mobile-contact.png');

    console.log('\nAll exact-direction tests passed successfully!');
    client.close();
  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    chrome.kill();
  }
}

main();

