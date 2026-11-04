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
      '--user-data-dir=/tmp/chrome-test-simplified',
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
    console.log('\n--- 1. Testing Desktop (1440x900) Single-Page Flow ---');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await wait(2000);

    // Capture Hero Section
    let shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-hero-desktop.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-hero-desktop.png');

    // Scroll to #work
    console.log('Scrolling to #work...');
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('work')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-work-desktop.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-work-desktop.png');

    // Scroll to signature moment
    console.log('Scrolling to Signature Animated Moment...');
    await client.send('Runtime.evaluate', {
      expression: `
        const sigHeading = Array.from(document.querySelectorAll('span')).find(s => s.textContent.includes('Editorial Sequence'));
        sigHeading?.scrollIntoView({ behavior: 'instant', block: 'center' });
      `,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-signature-moment.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-signature-moment.png');

    // Test Opening Lightbox Modal
    console.log('Testing photo click to open inspection modal...');
    await client.send('Runtime.evaluate', {
      expression: `
        const firstPhotoBtn = document.querySelector('#work button');
        firstPhotoBtn?.click();
      `,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-lightbox-open.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-lightbox-open.png');

    // Press Escape to close modal
    console.log('Pressing Escape to close modal...');
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
    await wait(600);

    // Scroll to #about
    console.log('Scrolling to #about...');
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-about-desktop.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-about-desktop.png');

    // Scroll to #contact
    console.log('Scrolling to #contact...');
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-contact-desktop.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-contact-desktop.png');

    // 2. Mobile Test (390x844)
    console.log('\n--- 2. Testing Mobile (390x844) First Screen & Vertical Flow ---');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await wait(2000);

    // Capture Mobile First Screen
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-mobile-first-screen.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-mobile-first-screen.png');

    // Check Mobile First Screen Elements
    const mobileScreenCheck = await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const vh = window.innerHeight;
          const wordmark = document.querySelector('header a');
          const title = document.querySelector('h1');
          const heroImg = document.querySelector('#top img');
          const viewWorkBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('View work'));
          const enquireBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enquire'));
          
          const rect = (el) => el ? el.getBoundingClientRect() : null;
          const isAboveFold = (el) => {
            const r = rect(el);
            return r && r.top >= 0 && r.bottom <= vh + 50; // with small tolerance
          };

          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;

          return {
            hasWordmark: !!wordmark,
            hasTitle: !!title,
            hasHeroImg: !!heroImg,
            viewWorkVisible: isAboveFold(viewWorkBtn),
            enquireVisible: isAboveFold(enquireBtn),
            noOverflow: docWidth <= winWidth,
            docWidth,
            winWidth
          };
        })()
      `,
      returnByValue: true,
    });
    console.log('Mobile Check Result:', mobileScreenCheck.result.value);

    // Scroll down mobile page to check work
    console.log('Scrolling down mobile page to #work...');
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('work')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await wait(800);
    shot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('verify-mobile-work.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved verify-mobile-work.png');

    console.log('\nAll single-page verification tests completed successfully!');
    client.close();
  } catch (err) {
    console.error('Verification failed:', err);
  } finally {
    chrome.kill();
  }
}

main();

