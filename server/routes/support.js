const express = require('express');
const https = require('https');
const url = require('url');

const router = express.Router();

// Expect the n8n webhook URL in env
const WEBHOOK_URL = process.env.SUPPORT_CHAT_WEBHOOK;

router.post('/chat', (req, res) => {
  if (!WEBHOOK_URL) {
    return res.status(500).json({ message: 'Support webhook is not configured on the server.' });
  }

  try {
    const parsed = url.parse(WEBHOOK_URL);

    const data = JSON.stringify({
      chatInput: req.body && req.body.chatInput,
    });

    const options = {
      hostname: parsed.hostname,
      path: parsed.path,
      protocol: parsed.protocol,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const forwardReq = https.request(options, (forwardRes) => {
      let body = '';
      forwardRes.on('data', (chunk) => (body += chunk));
      forwardRes.on('end', () => {
        const status = forwardRes.statusCode || 200;
        const contentType = forwardRes.headers['content-type'] || 'application/json';
        res.status(status);
        res.setHeader('Content-Type', contentType);
        // Try to parse JSON; if fails, send raw text
        try {
          const json = JSON.parse(body);
          res.json(json);
        } catch (_) {
          res.send(body);
        }
      });
    });

    forwardReq.on('error', (err) => {
      console.error('Support proxy error:', err);
      res.status(502).json({ message: 'Failed to reach support service.' });
    });

    forwardReq.write(data);
    forwardReq.end();
  } catch (e) {
    console.error('Support proxy exception:', e);
    res.status(500).json({ message: 'Support proxy internal error.' });
  }
});

module.exports = router;
