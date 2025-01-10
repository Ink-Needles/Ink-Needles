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
      <div className="quality-text">
        <h1>
          Издигнахме стандарта за качество – и продължаваме да го надминаваме
        </h1>
        <p>
          След години на усъвършенстване и стремеж към безкомпромисно качество,
          започнахме с едно изключително изделие, което спечели доверието на
          професионалисти.
        </p>
        <p>
          Днес нашата селекция от висококачествени продукти обединява най-доброто
          за всеки, който цени прецизността и резултатите.
        </p>
        <p>
          Всеки артикул е внимателно подбран, за да отговори на нуждите на
          най-взискателните професионалисти в индустрията.
        </p>
      </div>

      <div className="image-first-container">
        <div className="image-box">
          <img src="jeep1.jpg" alt="Image 1" className="image" />
        </div>
        <div className="image-box">
          <img src="jeep2.jpg" alt="Image 2" className="image" />
        </div>
        <div className="image-box">
          <img src="jeep3.jpg" alt="Image 3" className="image" />
        </div>
        <div className="image-box">
          <img src="jeep4.jpg" alt="Image 4" className="image" />
        </div>
      </div>

      <h1 className='title1'>
        Любими продукти на <br />професионалистите
      </h1>

      <div className="large-container">
        <div className="section">
          <div className="section-image">
            <img src="jeep1.jpg" alt="Large Image 1" />
          </div>
          <div className="section-text">
            <p>Текст за секция 1. Това е описание на продукт или услуга.</p>
            <button className="learn-more-btn">Научете повече</button>
          </div>
        </div>

        <div className="section reverse">
          <div className="section-text">
            <p>Текст за секция 2. Това е описание на продукт или услуга.</p>
            <button className="learn-more-btn">Научете повече</button>
          </div>
          <div className="section-image">
            <img src="jeep2.jpg" alt="Large Image 2" />
          </div>
        </div>

        <div className="section">
          <div className="section-image">
            <img src="jeep3.jpg" alt="Large Image 3" />
          </div>
          <div className="section-text">
            <p>Текст за секция 3. Това е описание на продукт или услуга.</p>
            <button className="learn-more-btn">Научете повече</button>
          </div>
        </div>
      </div>


      <div className="elfsight-container">
        <div
          ref={elfsightRef}
          className="elfsight-app-aab9349d-1ec7-4630-bf00-9134953a4904"
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  );
};

export default WelcomePage;
