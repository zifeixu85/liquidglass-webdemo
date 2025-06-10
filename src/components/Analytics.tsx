import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Google Analytics
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-3GJJZPH7DS';
    document.head.appendChild(gtagScript);

    const gtagConfig = document.createElement('script');
    gtagConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3GJJZPH7DS');
    `;
    document.head.appendChild(gtagConfig);

    // Microsoft Clarity
    const clarityScript = document.createElement('script');
    clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "rxdl6uso9d");
    `;
    document.head.appendChild(clarityScript);

    // Plausible Analytics
    const plausibleScript = document.createElement('script');
    plausibleScript.defer = true;
    plausibleScript.setAttribute('data-domain', 'liquidglass-kit.dev');
    plausibleScript.src = 'https://plausible.io/js/script.pageview-props.tagged-events.js';
    document.head.appendChild(plausibleScript);
  }, []);

  return null; // 这个组件不渲染任何内容
};

export default Analytics;