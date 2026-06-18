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
    .warning {
      background: rgba(245,166,35,0.1); border: 1px solid rgba(245,166,35,0.3);
      border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; max-width: 320px;
    }
    .warning p { color: #f5a623; margin: 0; font-size: 0.95rem; line-height: 1.6; }
    h2 { font-size: 1.3rem; margin-bottom: 12px; }
    .open-btn {
      display: inline-block; background: #f5a623; color: #000;
      font-size: 1rem; font-weight: 700; padding: 14px 28px;
      border-radius: 10px; cursor: pointer; border: none;
      width: 100%; max-width: 320px; margin-bottom: 16px;
    }
    .instruction { font-size: 0.9rem; color: #666; margin-bottom: 24px; line-height: 1.8; max-width: 300px; }
    .instruction strong { color: #aaa; }
    .skip { font-size: 0.8rem; color: #444; text-decoration: underline; cursor: pointer; }
    .spinner {
      width: 40px; height: 40px;
      border: 3px solid #1f2937; border-top-color: #f5a623;
      border-radius: 50%; animation: spin 0.8s linear infinite;
      margin-bottom: 24px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>

  <div id="loading">
    <div class="spinner"></div>
    <h2>Opening in Chrome...</h2>
  </div>

  <div id="gate" style="display:none; flex-direction:column; align-items:center;">
    <div class="warning">
      <p>⚠️ If you continue here, you'll lose all your progress every time you return.</p>
    </div>
    <h2>Open in your browser</h2>
    <button class="open-btn" id="openBtn" onclick="window.location.href='${dest}'">Open in browser</button>
    <p class="instruction" id="instruction"></p>
    <span class="skip" onclick="window.location.href='${dest}'">Continue here anyway</span>
  </div>

<script>
  const dest = '${dest}';
  const ua = navigator.userAgent || '';
  const isIG = ua.includes('Instagram') || ua.includes('FBAN') || ua.includes('FBAV');
  const isIOS = /iP(hone|ad|od)/.test(ua);
  const isAndroid = /Android/.test(ua);

  function showGate() {
    document.getElementById('loading').style.display = 'none';
    const gate = document.getElementById('gate');
    gate.style.display = 'flex';
    if (isIOS) {
      document.getElementById('openBtn').textContent = 'Open in Safari';
      document.getElementById('instruction').innerHTML = 'Tap <strong>•••</strong> at the top right<br>then tap <strong>"Open in browser"</strong>';
    } else {
      document.getElementById('openBtn').textContent = 'Open in Chrome';
      document.getElementById('instruction').innerHTML = 'Tap <strong>⋮</strong> at the top right<br>then tap <strong>"Open in browser"</strong>';
    }
  }

  if (!isIG) {
    // Not in IG browser — redirect directly
    window.location.href = dest;
  } else if (isAndroid) {
    // Android — try Chrome intent
    const intentUrl = 'intent://' + dest.replace(/^https?:\\/\\//, '') +
      '#Intent;scheme=https;package=com.android.chrome;end';
    window.location.href = intentUrl;
    // If intent fails, show gate after 2s
    setTimeout(showGate, 2000);
  } else {
    // iOS — can't force Safari, show gate immediately
    document.getElementById('loading').style.display = 'none';
    showGate();
  }
<\/script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
