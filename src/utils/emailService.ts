interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const subscribeToNewsletter = async (email: string): Promise<EmailResponse> => {
  const apiKey = import.meta.env.VITE_RESEND_API_KEY;
  const fromEmail = import.meta.env.VITE_FROM_EMAIL || 'noreply@liquidglass-kit.dev';
  
  console.log('Checking API key:', apiKey ? 'Found' : 'Not found');
  
  if (!apiKey) {
    console.error('Resend API key not found in environment variables');
    return {
      success: false,
      message: 'Email service not configured. Please try again later.'
    };
  }

  try {
    // Send welcome email to subscriber
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: email,
        subject: '🎉 Welcome to Liquid Glass Kit!',
        html: generateWelcomeEmail(email),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
      id: data.id
    };
  } catch (error) {
    console.error('Email subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
    };
  }
};

const generateWelcomeEmail = (_email: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Liquid Glass Kit</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo h1 {
      color: white;
      font-size: 28px;
      font-weight: 700;
      margin: 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    .logo p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 16px;
      margin: 5px 0 0 0;
    }
    .content {
      color: white;
      text-align: center;
    }
    .content h2 {
      font-size: 24px;
      margin-bottom: 20px;
      color: white;
    }
    .content p {
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 20px;
      font-size: 16px;
    }
    .features {
      text-align: left;
      margin: 30px 0;
    }
    .feature {
      display: flex;
      align-items: center;
      margin: 15px 0;
      color: rgba(255, 255, 255, 0.9);
    }
    .feature::before {
      content: "✨";
      margin-right: 10px;
      font-size: 18px;
    }
    .cta {
      text-align: center;
      margin: 30px 0;
    }
    .cta a {
      display: inline-block;
      background: linear-gradient(135deg, #3B82F6, #8B5CF6);
      color: white;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 12px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
      transition: transform 0.2s;
    }
    .cta a:hover {
      transform: translateY(-2px);
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="glass-card">
      <div class="logo">
        <h1>Liquid Glass</h1>
        <p>liquidglass-kit.dev</p>
      </div>
      
      <div class="content">
        <h2>Welcome to the Future of Design! 🎉</h2>
        <p>Thank you for subscribing to Liquid Glass Kit updates! You've just joined thousands of developers and designers who are building the next generation of beautiful interfaces.</p>
        
        <div class="features">
          <div class="feature">Weekly curated SwiftUI components and React libraries</div>
          <div class="feature">Latest WWDC 2025 Liquid Glass design patterns</div>
          <div class="feature">Exclusive access to new tools and frameworks</div>
          <div class="feature">CSS glassmorphism tutorials and code snippets</div>
          <div class="feature">Early previews of iOS 26 & macOS 26 design updates</div>
        </div>
        
        <div class="cta">
          <a href="https://liquidglass-kit.dev/#learning">Start Learning Now</a>
        </div>
        
        <p>Get ready to create stunning, glass-like interfaces that users will love!</p>
      </div>
      
      <div class="footer">
        <p>You're receiving this because you subscribed at <strong>liquidglass-kit.dev</strong></p>
        <p>© 2025 Liquid Glass Kit - Community resource for Apple's design system</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
};