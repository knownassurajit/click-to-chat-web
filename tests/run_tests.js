const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Configurations
const TARGET_URL = process.env.TEST_TARGET_URL || 'http://localhost:8080';
const REPORT_PATH = process.env.TEST_REPORT_PATH || path.join(__dirname, 'test-report.md');

console.log(`Starting Click to Chat Integration Test against target: ${TARGET_URL}`);

const results = [];
let htmlContent = '';
let jsContent = '';
let cssContent = '';

function logTest(name, passed, detail = '') {
  results.push({ name, passed, detail });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name} ${detail ? `- ${detail}` : ''}`);
}

async function run() {
  // Test 1: Fetch Container HTTP Response
  try {
    const res = await fetch(`${TARGET_URL}/`);
    if (res.status === 200) {
      htmlContent = await res.text();
      logTest('Container Server Reachable', true, `HTTP 200 OK from ${TARGET_URL}`);
    } else {
      logTest('Container Server Reachable', false, `HTTP Status ${res.status}`);
      process.exit(1);
    }
  } catch (err) {
    logTest('Container Server Reachable', false, `Could not connect to container: ${err.message}`);
    process.exit(1);
  }

  // Test 2: Fetch style.css and app.js from container
  try {
    const cssRes = await fetch(`${TARGET_URL}/style.css`);
    cssContent = await cssRes.text();
    logTest('Asset Load: style.css', cssRes.status === 200, `HTTP status ${cssRes.status}`);

    const jsRes = await fetch(`${TARGET_URL}/app.js`);
    jsContent = await jsRes.text();
    logTest('Asset Load: app.js', jsRes.status === 200, `HTTP status ${jsRes.status}`);
  } catch (err) {
    logTest('Asset Loading', false, `Failed to load static assets: ${err.message}`);
    process.exit(1);
  }

  // Test 3: Load JSDOM and execute app.js in container context
  let dom;
  try {
    const virtualConsole = new (require('jsdom')).VirtualConsole();
    virtualConsole.on('log', (...args) => console.log('[JSDOM LOG]', ...args));
    virtualConsole.on('error', (...args) => console.error('[JSDOM ERR]', ...args));
    virtualConsole.on('warn', (...args) => console.warn('[JSDOM WARN]', ...args));

    dom = new JSDOM(htmlContent, {
      url: TARGET_URL,
      runScripts: 'dangerously',
      resources: 'usable',
      virtualConsole
    });

    const { window } = dom;
    
    // Inject CSS
    const styleEl = window.document.createElement('style');
    styleEl.textContent = cssContent;
    window.document.head.appendChild(styleEl);

    // Mock localStorage
    const storageMock = (() => {
      let store = {};
      return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; },
        get length() { return Object.keys(store).length; },
        key: (i) => Object.keys(store)[i] || null
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: storageMock, writable: true });

    // Mock open link to prevent actual window opening
    window.open = (url) => {
      window.openedUrl = url;
      return window;
    };

    // Execute application script synchronously using eval
    window.eval(jsContent);

    // Explicitly invoke init to bind listeners synchronously for testing
    if (typeof window.init === 'function') {
      window.init();
    }

    logTest('JSDOM Environment Initialization', true, 'Executed app.js and initialized DOM listeners successfully');

    // Run DOM Tests
    runDomTests(window);

  } catch (err) {
    logTest('DOM Execution Context', false, `Script execution error: ${err.stack}`);
  }

  // Write reports
  generateReport();
}

function runDomTests(window) {
  const { document, localStorage } = window;

  const phoneInput = document.getElementById('phone-number');
  const errorText = document.getElementById('phone-error-text');
  const openChatBtn = document.getElementById('btn-open-chat');
  const copyBtn = document.getElementById('btn-copy-link');
  const linkDisplay = document.getElementById('generated-link');
  const flagText = document.getElementById('selected-flag');
  const codeText = document.getElementById('selected-code');

  // Test DOM Structure
  const elementsExist = phoneInput && errorText && openChatBtn && copyBtn && linkDisplay && flagText && codeText;
  logTest('DOM Structure Verification', !!elementsExist, 'Verified presence of all required input fields and controls');

  // Test Input Sanitization
  phoneInput.value = '(123) 456-7890';
  phoneInput.dispatchEvent(new window.Event('input'));
  const isSanitized = phoneInput.value === '1234567890';
  logTest('Input Sanitization', isSanitized, `Typed '(123) 456-7890', sanitized to: '${phoneInput.value}'`);

  // Test Paste Full Number Sanitization & Country Auto-Detection
  const pasteData = {
    getData: () => '+44 (7911) 123-456'
  };
  const pasteEvent = new window.Event('paste', { bubbles: true, cancelable: true });
  pasteEvent.clipboardData = pasteData;
  phoneInput.dispatchEvent(pasteEvent);
  
  const isUKSelected = flagText.textContent === '🇬🇧' && codeText.textContent === '+44';
  const isUKNumberParsed = phoneInput.value === '7911123456';
  logTest('Full Number Paste Parsing', isUKSelected && isUKNumberParsed, `Pasted +44 (7911) 123-456, detected: ${flagText.textContent} ${codeText.textContent}, parsed: '${phoneInput.value}'`);

  // Test Validation - Invalid (Too Short)
  phoneInput.value = '12';
  phoneInput.dispatchEvent(new window.Event('input'));
  const isInvalidShort = openChatBtn.disabled === true && errorText.textContent.includes('between 4 and 15');
  logTest('Form Validation (Too Short)', isInvalidShort, `Input length 2 -> button disabled: ${openChatBtn.disabled}, error message: "${errorText.textContent}"`);

  // Test Validation - Valid
  phoneInput.value = '7911123456';
  phoneInput.dispatchEvent(new window.Event('input'));
  const isValid = openChatBtn.disabled === false && errorText.textContent === '' && copyBtn.disabled === false;
  logTest('Form Validation (Valid Number)', isValid, `Input length 10 -> button disabled: ${openChatBtn.disabled}, error message: "${errorText.textContent}"`);

  // Test Link Generator Update
  const isLinkCorrect = linkDisplay.textContent === 'wa.me/447911123456';
  logTest('Link Generator Output', isLinkCorrect, `Generated link text: "${linkDisplay.textContent}"`);

  // Test Chat Opening & History Sync
  localStorage.clear();
  openChatBtn.click();
  
  const openedCorrectLink = window.openedUrl === 'https://wa.me/447911123456';
  const historyRaw = localStorage.getItem('click_to_chat_history');
  const history = historyRaw ? JSON.parse(historyRaw) : [];
  const isSavedInHistory = history.length === 1 && history[0].number === '7911123456' && history[0].dial === '44';
  logTest('Open Chat Action & History Persistence', openedCorrectLink && isSavedInHistory, `Opened url: ${window.openedUrl}, saved to local storage history: ${historyRaw}`);

  // Test History limit of 5 and Deduplication
  const dialList = ['1', '91', '61', '33', '49', '44'];
  const numList = ['55501928', '987654321', '41234567', '61234567', '71234567', '7911123456'];
  const flagList = ['🇺🇸', '🇮🇳', '🇦🇺', '🇫🇷', '🇩🇪', '🇬🇧'];
  
  // Call saveToHistory multiple times
  for (let i = 0; i < dialList.length; i++) {
    // Set mock country and phone input
    window.selectCountry({ dial: dialList[i], flag: flagList[i], name: 'Test Country', code: 'TC' });
    phoneInput.value = numList[i];
    phoneInput.dispatchEvent(new window.Event('input'));
    openChatBtn.click();
  }
  
  const historyListAfter = JSON.parse(localStorage.getItem('click_to_chat_history') || '[]');
  const isCappedAt5 = historyListAfter.length === 5;
  logTest('Session History Limit (Max 5)', isCappedAt5, `History list length: ${historyListAfter.length} (Expected 5)`);
}

function generateReport() {
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = total - passed;

  const mdReport = `
# Click to Chat Web — Containerized Integration Test Report

**Execution Time**: ${new Date().toISOString()}
**Test Target URL**: ${TARGET_URL}
**Overall Status**: ${failed === 0 ? '🟢 SUCCESS' : '🔴 FAILED'}

## Summary
- **Total Tests**: ${total}
- **Passed**: ${passed}
- **Failed**: ${failed}

## Test Cases Detailed Outputs
| Test Case Name | Status | Details |
| :--- | :--- | :--- |
${results.map(r => `| ${r.name} | ${r.passed ? '✅ PASS' : '❌ FAIL'} | ${r.detail.replace(/\|/g, '\\|')} |`).join('\n')}

---
*Report automatically generated by tests/run_tests.js*
`;

  fs.writeFileSync(REPORT_PATH, mdReport.trim());
  console.log(`\nTest report generated successfully at: ${REPORT_PATH}`);
  
  if (failed > 0) {
    console.error('Some tests failed. Exiting with failure code.');
    process.exit(1);
  } else {
    console.log('All tests passed successfully!');
    process.exit(0);
  }
}

// Hook some test helper triggers in app.js if they don't exist
// To run app.js functions in isolation, we can listen to custom events or mock them
// Let's make sure the custom history addition works if we call window helper functions.
// We can define custom events in runDomTests to invoke saveToHistory if necessary, or just rely on openChat click!
// The tests above rely on openChatBtn.click() which automatically calls saveToHistory! Excellent.

run();
