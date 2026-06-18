export default function handler(req, res) {
  const { u } = req.query;
  const dest = u || 'https://maharathub.com';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Opening...</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0f1e; color: #fff; min-height: 100vh;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 2rem; text-align: center;
    }
    .spinner {
      width: 40px; height: 40px;
      border: 3px solid #1f2937; border-top-color: #f5a623;
      border-radius: 50%; animation: spin 0.8s linear infinite;
      margin-bottom: 24px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    h2 { font-size: 1.3rem; margin-bottom: 12px; }
    p { color: #888; font-size: 0.95rem; line-height: 1.6; max-width: 300px; margin: 0 auto 24px; }
    .gate { display: none; flex-direction: column; align-items: center; }
    .warning {
      background: rgba(245,166,35,0.1); border: 1px solid rgba(245,166,35,0.3);
      border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; max-width: 320px;
    }
    .warning p { color: #f5a623; margin: 0; font-size: 0.9rem; }
    .open-btn {
      display: inline-block; background: #f5a623; color: #000;
      font-size: 1rem; font-weight: 700; padding: 14px 28px;
      border-radius: 10px; text-decoration: none; margin-bottom: 16px;
      cursor: pointer; border: none; width: 100%; max-width: 320px;
    }
    .instruction { font-size: 0.85rem; color: #666; margin-bottom: 20px; line-height: 1.6; }
    .skip { font-size: 0.8rem; color: #444; text-decoration: underline; cursor: pointer; }
  </style>
</head>
<body>
  <div id="loading">
    <div class="spinner"></div>
    <h2>Opening in your browser...</h2>
    <p>Taking you to your destination in Safari or Chrome.</p>
  </div>

  <div class="gate" id="gate">
    <div class="warning">
      <p>⚠️ If you continue here, you'll lose all your progress every time you return. Open in your browser to keep your progress.</p>
    </div>
    <h2>Open in your browser</h2>
    <button class="open-btn" onclick="tryOpen()" id="openBtn">Open in Safari</button>
    <p class="instruction" id="instruction"></p>
    <span class="skip" onclick="window.location.href='${dest}'">Continue here anyway</span>
  </div>

<script>
  const dest = '${dest}';
  const ua = navigator.userAgent || '';
  const isIG = ua.includes('Instagram') || ua.includes('FBAN');
  const isIOS = /iP(hone|ad|od)/.test(ua);
  const isAndroid = /Android/.test(ua);

  function showGate() {
    document.getElementById('loading').style.display = 'none';
    const gate = document.getElementById('gate');
    gate.style.display = 'flex';
    if (isIOS) {
      document.getElementById('openBtn').textContent = 'Open in Safari';
      document.getElementById('instruction').innerHTML = 'Or tap <strong>•••</strong> top right → <strong>"Open in browser"</strong>';
    } else {
      document.getElementById('openBtn').textContent = 'Open in Chrome';
      document.getElementById('instruction').innerHTML = 'Or tap <strong>⋮</strong> top right → <strong>"Open in browser"</strong>';
    }
  }

  function tryOpen() {
    if (isAndroid) {
      window.location.href = 'intent://' + dest.replace(/^https?:\\/\\//, '') + '#Intent;scheme=https;package=com.android.chrome;end';
      setTimeout(() => { window.location.href = dest; }, 1500);
    } else {
      window.location.href = 'x-web-search://?' + dest;
      setTimeout(showGate, 1500);
    }
  }

  if (!isIG) {
    window.location.href = dest;
  } else if (isAndroid) {
    setTimeout(() => {
      window.location.href = 'intent://' + dest.replace(/^https?:\\/\\//, '') + '#Intent;scheme=https;package=com.android.chrome;end';
      setTimeout(showGate, 2000);
    }, 800);
  } else if (isIOS) {
    setTimeout(() => {
      window.location.href = 'x-web-search://?' + dest;
      setTimeout(showGate, 1500);
    }, 800);
  } else {
    showGate();
  }
<\/script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
