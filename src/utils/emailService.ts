interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

// 使用 Formspree (最简单，无需后端，无需 Resend)
export const subscribeToNewsletter = async (email: string): Promise<EmailResponse> => {
  try {
    const response = await fetch('https://formspree.io/f/mzzgrbvl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        _subject: '🎉 New Liquid Glass Kit Subscription',
        message: `${email} subscribed to Liquid Glass Kit updates`,
        _replyto: email,
        // Formspree 会自动发送确认邮件给订阅者
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: 'Successfully subscribed! Check your email for confirmation.',
        id: data.submission_id
      };
    }
    
    // Formspree 错误处理
    if (data.errors) {
      const errorMessage = data.errors.map((e: any) => e.message).join(', ');
      throw new Error(errorMessage);
    }
    
    throw new Error('Subscription failed');
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
    };
  }
};

