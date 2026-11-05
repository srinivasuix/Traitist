/**
 * TRAITIST™ — Transactional & Campaign Email System
 * Styled to match the brutalist academic luxury aesthetic:
 * Canvas: #ECEBE6, Ink: #111111, Accent: #FF5722, Surface: #DFDDD7
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preheader: string;
  category: 'transactional' | 'lifecycle' | 'campaign';
  generateHtml: (data: Record<string, any>) => string;
}

export const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  orderConfirmation: {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    subject: 'Order Verified: {{orderId}} • Zero Peer Review Required',
    preheader: 'Your heavyweight research uniform is confirmed and queued for dispatch.',
    category: 'transactional',
    generateHtml: (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRAITIST™ Order Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ECEBE6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ECEBE6; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ECEBE6; border: 1px solid #111111; padding: 32px 24px;">
          <!-- Brand Header -->
          <tr>
            <td style="border-bottom: 2px solid #111111; padding-bottom: 20px;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 24px; font-weight: 900; letter-spacing: -0.04em; text-transform: uppercase;">TRAITIST™</span>
                  </td>
                  <td align="right">
                    <span style="font-family: monospace; font-size: 11px; background-color: #111111; color: #ECEBE6; padding: 4px 8px; text-transform: uppercase;">VERIFIED</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 28px 0 16px 0;">
              <span style="font-family: monospace; font-size: 11px; color: #FF5722; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">DISPATCH QUEUE CONFIRMED</span>
              <h1 style="font-size: 28px; font-weight: 800; text-transform: uppercase; margin: 8px 0 12px 0; letter-spacing: -0.02em; line-height: 1.1;">YOUR RESEARCH UNIFORM IS OFFICIALLY IN TRANSIT.</h1>
              <p style="font-size: 14px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">
                Order <strong>${data.orderId || '#TR-88219'}</strong> has been received by our studio workshop. Your 200 GSM heavyweight combed cotton tee is undergoing final inspection before being sealed and dispatched.
              </p>
            </td>
          </tr>

          <!-- Order Summary Box -->
          <tr>
            <td style="background-color: #DFDDD7; border: 1px solid #D1CFCA; padding: 20px; margin-bottom: 24px;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; padding-bottom: 12px; border-bottom: 1px dashed #111111;">SPECIFICATION</td>
                  <td align="right" style="font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; padding-bottom: 12px; border-bottom: 1px dashed #111111;">VALUATION</td>
                </tr>
                <tr>
                  <td style="font-size: 13px; font-weight: 600; padding: 12px 0 4px 0;">${data.productTitle || 'PhD Progress Tee'}</td>
                  <td align="right" style="font-family: monospace; font-size: 13px; font-weight: bold; padding: 12px 0 4px 0;">₹${data.totalAmount || '799'}</td>
                </tr>
                <tr>
                  <td style="font-family: monospace; font-size: 11px; color: #666666;">Size: ${data.size || 'L'} • 200 GSM Bio-Washed Cotton</td>
                  <td align="right" style="font-family: monospace; font-size: 11px; color: #10B981; font-weight: bold;">FREE SHIPPING</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call to action button -->
          <tr>
            <td align="center" style="padding: 32px 0 24px 0;">
              <a href="${data.trackingUrl || 'https://traitist.in/#shop'}" style="background-color: #111111; color: #ECEBE6; text-decoration: none; padding: 14px 28px; font-size: 12px; font-family: monospace; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block;">
                TRACK YOUR RESEARCH UNIFORM →
              </a>
            </td>
          </tr>

          <!-- Sign-off & Policy -->
          <tr>
            <td style="border-top: 1px solid #D1CFCA; padding-top: 20px; font-size: 11px; color: #666666; font-family: monospace; line-height: 1.6;">
              <p style="margin: 0 0 6px 0;"><strong>7-DAY SIZE EXCHANGES:</strong> If the fit isn't thesis-defense ready, contact studio support within 7 days of delivery.</p>
              <p style="margin: 0;">TRAITIST™ Studios • Bengaluru, India • threads@traitist.in</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  },
  shippingConfirmation: {
    id: 'shipping-confirmation',
    name: 'Shipping Confirmation',
    subject: 'Dispatched: Your Traitist Uniform Has Left The Lab',
    preheader: 'Tracking details and estimated arrival for order {{orderId}}.',
    category: 'transactional',
    generateHtml: (data) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Dispatched: Traitist</title></head>
<body style="margin: 0; padding: 0; background-color: #ECEBE6; font-family: sans-serif; color: #111111;">
  <table width="100%" style="background-color: #ECEBE6; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #ECEBE6; border: 1px solid #111111; padding: 32px 24px;">
          <tr>
            <td style="border-bottom: 2px solid #111111; padding-bottom: 16px;">
              <span style="font-size: 22px; font-weight: 900; text-transform: uppercase;">TRAITIST™</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 0;">
              <span style="font-family: monospace; font-size: 11px; color: #10B981; font-weight: bold;">DISPATCHED & EN ROUTE</span>
              <h2 style="font-size: 24px; font-weight: 800; text-transform: uppercase; margin: 8px 0;">YOUR TEE HAS OFFICIALLY ESCAPED THE FACILITY.</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #333333;">
                Carrier: <strong>BlueDart / Delhivery Express</strong><br>
                AWB Tracking Code: <strong>${data.trackingNumber || 'TR-773918290-IN'}</strong><br>
                Estimated Delivery: <strong>3–5 Business Days</strong>
              </p>
              <div style="margin-top: 24px;">
                <a href="${data.trackingUrl || 'https://traitist.in'}" style="background-color: #111111; color: #ECEBE6; text-decoration: none; padding: 12px 24px; font-size: 12px; font-family: monospace; font-weight: bold; display: inline-block;">
                  VIEW LIVE TRANSIT STATUS →
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  },
  welcomeNewsletter: {
    id: 'welcome-newsletter',
    name: 'Welcome to The List',
    subject: 'Welcome to The List · Beat Your Supervisor To The Drop',
    preheader: 'Your 24-hour early access code and exclusive drop privileges are active.',
    category: 'lifecycle',
    generateHtml: () => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>TRAITIST™ The List</title></head>
<body style="margin: 0; padding: 0; background-color: #ECEBE6; font-family: sans-serif; color: #111111;">
  <table width="100%" style="background-color: #ECEBE6; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #ECEBE6; border: 1px solid #111111; padding: 32px 24px;">
          <tr>
            <td style="border-bottom: 2px solid #111111; padding-bottom: 16px;">
              <span style="font-size: 22px; font-weight: 900; text-transform: uppercase;">TRAITIST™</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 0;">
              <span style="font-family: monospace; font-size: 11px; color: #FF5722; font-weight: bold;">INSIDER CREDENTIALS ACTIVE</span>
              <h2 style="font-size: 24px; font-weight: 800; text-transform: uppercase; margin: 8px 0;">FINALLY, AN EMAIL WORTH OPENING.</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #333333;">
                You are now on The List. You receive 24-hour priority access before public release, member-only drop codes, and zero spam.
              </p>
              <div style="background-color: #DFDDD7; padding: 16px; border: 1px solid #D1CFCA; margin: 20px 0;">
                <p style="font-family: monospace; font-size: 12px; margin: 0;">FIRST DROP CODE: <strong style="color: #FF5722;">PHDFIRST</strong> (Instant ₹100 Off)</p>
              </div>
              <a href="https://traitist.in/#shop" style="background-color: #111111; color: #ECEBE6; text-decoration: none; padding: 12px 24px; font-size: 12px; font-family: monospace; font-weight: bold; display: inline-block;">
                EXPLORE CURRENT PIECES →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  },
};
