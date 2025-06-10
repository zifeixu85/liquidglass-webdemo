interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const subscribeToNewsletter = async (email: string): Promise<EmailResponse> => {
  try {
    // Call our API route instead of Resend directly
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP ${response.status}`);
    }

    return {
      success: true,
      message: data.message || 'Successfully subscribed! Check your email for confirmation.',
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

