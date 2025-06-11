interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const subscribeToNewsletter = async (email: string): Promise<EmailResponse> => {
  console.log('[Email Service] Starting subscription for:', email);
  console.log('[Email Service] Current URL:', window.location.href);
  console.log('[Email Service] Environment:', window.location.hostname);
  
  try {
    // 根据环境使用不同的 API 地址
    const apiUrl = window.location.hostname === 'localhost' 
      ? 'https://liquidglass-kit.dev/api/subscribe'  // 本地开发时使用生产 API
      : '/api/subscribe';  // 生产环境使用相对路径
    
    console.log('[Email Service] API URL:', apiUrl);
    console.log('[Email Service] Sending request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
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
    
    // 检查是否是网络错误
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('[Email Service] Network error - API endpoint might not be accessible');
      console.error('[Email Service] This could mean:');
      console.error('- Vercel Function is not deployed');
      console.error('- API route is returning an error before sending headers');
      console.error('- Network/CORS issue');
      
      // 尝试直接检查 API 端点
      try {
        const checkResponse = await fetch('/api/subscribe', { method: 'OPTIONS' });
        console.log('[Email Service] OPTIONS check response:', checkResponse.status);
      } catch (optionsError) {
        console.error('[Email Service] OPTIONS check failed:', optionsError);
      }
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
    };
  }
};


