import React, { useEffect, useRef } from 'react';

const WelcomePage = () => {
  const elfsightRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;

    if (elfsightRef.current) {
      elfsightRef.current.appendChild(script);
    }

    return () => {
      if (elfsightRef.current) {
        elfsightRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the store</h1>
      <h2>Instagram Gallery</h2>

      <div
        ref={elfsightRef}
        className="elfsight-app-aab9349d-1ec7-4630-bf00-9134953a4904"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default WelcomePage;