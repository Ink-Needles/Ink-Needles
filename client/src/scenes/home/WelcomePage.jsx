import React, { useEffect, useRef } from 'react';
import './WelcomePageStyle.css';

const WelcomePage = () => {
  const elfsightRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;

    if (elfsightRef.current) {
      elfsightRef.current.appendChild(script);
    }

    const observer = new MutationObserver(() => {
      const container = document.querySelector(
        '.elfsight-app-aab9349d-1ec7-4630-bf00-9134953a4904.eapps-instagram-feed.es-widget'
      );
      if (container) {
        const linkToRemove = container.querySelector(
          'a[href*="https://elfsight.com"]'
        );
        if (linkToRemove) {
          linkToRemove.style.display = 'none';
        }
      }
    });

    if (elfsightRef.current) {
      observer.observe(elfsightRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (elfsightRef.current) {
        elfsightRef.current.innerHTML = '';
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the store</h1>   

      <div
        ref={elfsightRef}
        className="elfsight-app-aab9349d-1ec7-4630-bf00-9134953a4904"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default WelcomePage;
