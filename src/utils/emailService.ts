interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const subscribeToNewsletter = async (email: string): Promise<EmailResponse> => {
  console.log('[Email Service] Starting subscription for:', email);
  
  try {
    console.log('[Email Service] Sending request to /api/subscribe');
    
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    console.log('[Email Service] Response status:', response.status);
    console.log('[Email Service] Response headers:', response.headers);
    
    // 检查 Content-Type 来决定如何解析响应
    const contentType = response.headers.get('content-type');
    console.log('[Email Service] Content-Type:', contentType);
    
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      console.log('[Email Service] JSON response:', data);
    } else {
      // 如果不是 JSON，读取文本内容
      const text = await response.text();
      console.error('[Email Service] Non-JSON response:', text);
      
      // 创建一个错误对象
      data = {
        success: false,
        error: text || 'Server error',
        details: `Response was not JSON. Status: ${response.status}, Text: ${text}`
      };
    }
    
    if (!response.ok) {
      console.error('[Email Service] Response not OK. Status:', response.status);
      console.error('[Email Service] Error data:', data);
      throw new Error(data.error || data.details || `Server error: ${response.status}`);
    }

    console.log('[Email Service] Subscription successful:', data);
    
    return {
      success: true,
      message: data.message || 'Successfully subscribed! Check your email for confirmation.',
      id: data.id
    };
  } catch (error) {
    console.error('[Email Service] Subscription error:', error);
    console.error('[Email Service] Error type:', typeof error);
    console.error('[Email Service] Error details:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
    };
  }
};


