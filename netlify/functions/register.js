// Netlify Function example: register.js
// This is an example serverless handler that receives a registration/contact payload,
// validates a basic honeypot field, optionally verifies a captcha token, and forwards
// the content via an email provider (e.g., SendGrid) or stores it in a DB.
// DO NOT COMMIT real API keys here. Use environment variables in your deploy platform.

// Example for Netlify functions (Node.js 14+)

const fetch = require('node-fetch'); // include if using node-fetch in your environment

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const payload = (() => {
      try { return JSON.parse(event.body); } catch (e) { return null; }
    })();

    if (!payload) return { statusCode: 400, body: 'Invalid JSON' };

    // Honeypot check
    if (payload._honey && payload._honey.trim()) {
      // Detected as spam - do not process
      return { statusCode: 200, body: 'OK' };
    }

    // Verify reCAPTCHA token (if supplied)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET;
    if (payload.recaptchaToken) {
      if (!recaptchaSecret) {
        console.warn('RECAPTCHA_SECRET not configured; skipping server-side verification');
      } else {
        try {
          const verifyResp = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${payload.recaptchaToken}`, { method: 'POST' });
          const verifyData = await verifyResp.json();
          // For reCAPTCHA v3, check success and score threshold
          const score = typeof verifyData.score !== 'undefined' ? verifyData.score : 1;
          if (!verifyData.success || score < 0.5) {
            console.warn('reCAPTCHA verification failed', verifyData);
            return { statusCode: 400, body: 'reCAPTCHA validation failed' };
          }
        } catch (err) {
          console.warn('Error verifying reCAPTCHA', err);
          return { statusCode: 500, body: 'reCAPTCHA verification error' };
        }
      }
    }

    // Build message for email or DB
    const message = `New registration from: ${payload.fullName || payload.name || 'Unknown'}\n\nEmail: ${payload.email}\nPhone: ${payload.phone || payload.phoneNumber || 'N/A'}\nTour: ${payload.tour || payload['Select Tour / Investigation'] || 'N/A'}\n\nMessage:\n${payload.message || payload.msg || ''}`;

    // Placeholder: send via SendGrid (example)
    // const sgApiKey = process.env.SENDGRID_API_KEY;
    // if (!sgApiKey) {
    //   console.warn('SENDGRID_API_KEY not configured, dropping to logs');
    // } else {
    //   // send email using SendGrid or another provider
    // }

    // For now, just log the message to Netlify function logs (safe for dev)
    console.log('Registration payload:', payload);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Registration received' })
    };
  } catch (err) {
    console.error('Register function error', err);
    return { statusCode: 500, body: 'Server Error' };
  }
};