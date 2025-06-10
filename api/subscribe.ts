export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    const { email } = req.body || {};
    const apiKey = process.env.RESEND_API_KEY || 're_7jKXiqkN_F4zVG1W4zGzw2EJkg9p9wiWJ';
    const fromEmail = 'Liquid Glass Kit <noreply@liquidglass-kit.dev>';

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ 
        success: false,
        error: 'Valid email is required' 
      });
    }

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: '🎉 Welcome to Liquid Glass Kit!',
        html: getSimpleWelcomeHTML(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      return res.status(500).json({
        success: false,
        error: `Email service error: ${response.status}`
      });
    }

    const data = await response.json();
    
    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
      id: data.id
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

function getSimpleWelcomeHTML(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Liquid Glass Kit</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background: #f4f4f4;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px;">
    <h1 style="color: #333; text-align: center;">🎉 Welcome to Liquid Glass Kit!</h1>
    <p>Thank you for subscribing! You'll receive updates about the latest Apple design patterns and development resources.</p>
    <p style="text-align: center;">
      <a href="https://liquidglass-kit.dev" style="background: #007AFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Website</a>
    </p>
    <p style="color: #666; font-size: 12px; text-align: center;">© 2025 Liquid Glass Kit</p>
  </div>
</body>
</html>`;
}