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

    // Try to parse as JSON, fallback to text if it fails
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Server returned an invalid response. Please try again.');
    }
    
    if (!response.ok) {
      throw new Error(data.message || data.error || `Server error: ${response.status}`);
    }

    return {
      success: true,
      message: data.message || 'Successfully subscribed! Check your email for confirmation.',
      id: data.id
    };
  } catch (error) {
    console.error('Email subscription error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.'
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
    };
  }
};

