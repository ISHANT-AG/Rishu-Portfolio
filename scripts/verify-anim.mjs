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
  console.log('Testing name dropping animation on http://localhost:3000/ ...');
  const chrome = spawn(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    [
      '--headless=new',
      '--remote-debugging-port=9222',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--user-data-dir=/tmp/chrome-test-anim-rishu',
    ],
    { stdio: 'ignore' }
  );

  await wait(1500);

  try {
    const list = await getJSON('http://127.0.0.1:9222/json');
    const page = list.find((p) => p.type === 'page');
    if (!page) throw new Error('No page found in Chrome');

    const client = new CDPClient(page.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await client.send('Page.navigate', { url: 'http://localhost:3000/' });

    // Track letter positions over 2 seconds
    const snapshots = [];
    for (let i = 0; i < 12; i++) {
      await wait(150);
      const res = await client.send('Runtime.evaluate', {
        expression: `
          (() => {
            const spans = Array.from(document.querySelectorAll('#top .will-change-transform'));
            return spans.map(s => {
              const style = window.getComputedStyle(s);
              return {
                text: s.innerText,
                opacity: parseFloat(style.opacity).toFixed(2),
                transform: style.transform
              };
            });
          })()
        `,
        returnByValue: true,
      });
      snapshots.push({ timeMs: (i + 1) * 150, letters: res.result.value });
    }

    console.log('Sampled Animation Timeline:');
    snapshots.forEach((s) => {
      console.log(`t = ${s.timeMs}ms:`, s.letters.map((l) => `${l.text}: op=${l.opacity}, tf=${l.transform}`).join(' | '));
    });

    await wait(800);
    const finalShot = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('anim-settled.png', Buffer.from(finalShot.data, 'base64'));
    console.log('Saved anim-settled.png');

    client.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    chrome.kill();
  }
}

main();

