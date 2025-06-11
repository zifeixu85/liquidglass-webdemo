import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_7jKXiqkN_F4zVG1W4zGzw2EJkg9p9wiWJ');

export default async function handler(req: any, res: any) {
  console.log('[Subscribe API] Request method:', req.method);
  console.log('[Subscribe API] Request headers:', req.headers);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    console.log('[Subscribe API] Handling OPTIONS preflight request');
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    console.log('[Subscribe API] Method not allowed:', req.method);
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    console.log('[Subscribe API] Request body:', req.body);
    const { email } = req.body || {};

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.log('[Subscribe API] Invalid email:', email);
      return res.status(400).json({ 
        success: false,
        error: 'Valid email is required' 
      });
    }

    console.log('[Subscribe API] Processing subscription for:', email);
    console.log('[Subscribe API] API Key present:', !!process.env.RESEND_API_KEY);
    
    // Send welcome email using Resend SDK
    const { data, error } = await resend.emails.send({
      from: 'Liquid Glass Kit <noreply@liquidglass-kit.dev>',
      to: [email],
      subject: '🎉 Welcome to Liquid Glass Kit!',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
          <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #1f2937; font-size: 28px; font-weight: 700; margin: 0;">🎉 Welcome to Liquid Glass Kit!</h1>
            </div>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for subscribing! You've just joined thousands of developers who are building the next generation of beautiful interfaces with Apple's Liquid Glass design system.
            </p>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="color: white; font-size: 18px; margin: 0 0 12px 0;">What you'll get:</h3>
              <ul style="color: rgba(255, 255, 255, 0.9); margin: 0; padding-left: 20px;">
                <li>Weekly SwiftUI components and React libraries</li>
                <li>Latest WWDC 2025 Liquid Glass design patterns</li>
                <li>iOS 26 & macOS 26 design system updates</li>
                <li>Exclusive access to new tools and frameworks</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://liquidglass-kit.dev" style="background: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                Explore Liquid Glass Kit
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              © 2025 Liquid Glass Kit • Community resource for Apple's design system
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[Subscribe API] Resend SDK error:', error);
      console.error('[Subscribe API] Error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({
        success: false,
        error: 'Failed to send welcome email',
        details: error.message || error
      });
    }
    
    console.log('[Subscribe API] Email sent successfully:', data);
    
    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
      id: data?.id
    });

  } catch (error) {
    console.error('[Subscribe API] Unexpected error:', error);
    console.error('[Subscribe API] Error type:', typeof error);
    console.error('[Subscribe API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}