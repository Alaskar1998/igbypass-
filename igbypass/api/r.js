module.exports = (req, res) => {
  const dest = req.query.u || 'https://maharathub.com';

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Opening...</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
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
      background: #f5a623; color: #000; font-size: 1rem; font-weight: 700;
      padding: 14px 28px; border-radius: 10px; cursor: pointer; border: none;
      width: 100%; max-width: 320px; margin-bottom: 16px;
    }
    .instruction { font-size: 0.9rem; color: #888; margin-bottom: 24px; line-height: 1.8; max-width: 300px; }
    .instruction strong { color: #ccc; }
    .skip { font-size: 0.8rem; color: #555; text-decoration: underline; cursor: pointer; }
  </style>
</head>
<body>
  <div id="gate" style="display:flex; flex-direction:column; align-items:center;">
    <div class="warning">
      <p>⚠️ If you continue here, you'll lose all your progress every time you return.</p>
    </div>
    <h2>Open in your browser</h2>
    <button class="open-btn" id="openBtn" onclick="window.location.href=dest">Open in browser</button>
    <p class="instruction" id="instruction"></p>
    <span class="skip" onclick="window.location.href=dest">Continue here anyway</span>
  </div>
<script>
  var dest = '${dest}';
  var ua = navigator.userAgent || '';
  var isAndroid = /Android/.test(ua);
  var isIOS = /iP(hone|ad|od)/.test(ua);

  if (isAndroid) {
    document.getElementById('openBtn').textContent = 'Open in Chrome';
    document.getElementById('instruction').innerHTML = 'Tap <strong>⋮</strong> top right → <strong>Open in browser</strong>';
    var intentUrl = 'intent://' + dest.replace(/^https?:\\/\\//, '') + '#Intent;scheme=https;package=com.android.chrome;end';
    window.location.href = intentUrl;
    setTimeout(function() { window.location.href = dest; }, 2000);
  } else if (isIOS) {
    document.getElementById('openBtn').textContent = 'Open in Safari';
    document.getElementById('instruction').innerHTML = 'Tap <strong>•••</strong> top right → <strong>Open in browser</strong>';
  } else {
    window.location.href = dest;
  }
</script>
</body>
</html>`);
};
