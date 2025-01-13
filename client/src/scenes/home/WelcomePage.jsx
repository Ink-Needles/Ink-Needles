import React, { useEffect, useRef, useState } from 'react';
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
          <h1 className="section-title2">Открийте DKlab</h1>
            <p>Tатуировъчната машина, която съчетава мощност, прецизност и комфорт в един компактен и стилен дизайн! С включени батерии и RCA адаптор, тя е готова да отговори на всички ваши нужди за дълготрайни и перфектни татуировки.</p>
            <button className="learn-more-btn">Научете повече</button>
          </div>
        </div>

        <div className="section reverse">
          <div className="section-text">
          <h1 className="section-title2">DK-W1 PRO</h1>
            <p>Безжичната машина за татуиране, която съчетава мощност и удобство! С 3 различни ръкохватки, две батерии и регулируем ход, тя осигурява перфектен контрол и прецизност. Насладете се на надеждност и иновация с DK-W1 Pro – идеалният избор за професионалисти!</p>
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
          <h1 className="section-title2">Открийте EZ P3 Pro</h1>
            <p>Безжичната машина за татуиране, която комбинира иновация, мощност и прецизност! С регулируем ход, Bluetooth свързаност и здрава конструкция, тя е идеалният избор за татуисти, които искат да издигнат своето творчество на ново ниво. Изберете P3 Pro за комфорт и качество при всяка сесия.</p>
            <button className="learn-more-btn">Научете повече</button>
          </div>
        </div>
      </div>

      <div className="image-second-container">
        <h1 className='image-second-container-title'>Вижте нашите предложения за:</h1>
        <div className="image-box2">
          <img src="jeep1.jpg" alt="Image 1" className="image2" />
        </div>
        <div className="image-box2">
          <img src="jeep2.jpg" alt="Image 2" className="image2" />
        </div>
        <div className="image-box2">
          <img src="jeep3.jpg" alt="Image 3" className="image2" />
        </div>
        <div className="image-box2">
          <img src="jeep4.jpg" alt="Image 4" className="image2" />
        </div>
      </div>

      <div className="large-container2">
        <div className="section reverse 2">
          <div className="section-text-reverse2">
          <h1 className="section-title2">EMALLA Cartridges</h1>
            <p>Експлозивно качество за съвършени татуировки – EMALLA картридж игли! Изработени с прецизност и иновация, те предлагат безкомпромисен контрол и комфорт. Изберете безопасност и ефективност за вашето творчество!</p>
            <button className="learn-more-btn">Научете повече</button>
          </div>
          <div className="section-image-reverse2">
            <img  src="jeep1.jpg" alt="Large Image 1" />
          </div>
        </div>

        <div className="section2">
        <div className="section-image2">
            <img src="jeep2.jpg" alt="Large Image 2" />
          </div>
          <div className="section-text2">
          <h1 className="section-title2">MAST PRO Cartridges</h1>
            <p>Експлозивно качество за съвършени татуировки – EMALLA картридж игли! Изработени с прецизност и иновация, те предлагат безкомпромисен контрол и комфорт. Изберете безопасност и ефективност за вашето творчество!</p>
            <button className="learn-more-btn">Научете повече</button>
          </div>

        </div>

        <div className="section reverse2">
          <div className="section-text-reverse2">
          <h1 className="section-title2">ProLine® Cartridges</h1>
            <p>ProLine винаги е пионер в челните редици на технологиите и винаги е посветен да предлага на татуистите напълно ново изживяване. Осигурявайки на вас и вашите клиенти безпроблемно изживяване всеки път.</p>
            <button className="learn-more-btn">Научете повече</button>
          </div>
          <div className="section-image-reverse2">
            <img src="jeep3.jpg" alt="Large Image 3" />
          </div>
        </div>
      </div>

      <div className="image-third-container">
        <h1 className='image-third-container-title'>При нас имате възможност да закупите:</h1>
        <div className="image-box3">
          <img src="jeep1.jpg" alt="Image 1" className="image3" />
        </div>
        <div className="image-box3">
          <img src="jeep2.jpg" alt="Image 2" className="image3" />
        </div>
        <div className="image-box3">
          <img src="jeep3.jpg" alt="Image 3" className="image3" />
        </div>
        <div className="image-box3">
          <img src="jeep4.jpg" alt="Image 4" className="image3" />
        </div>
        <div className="image-box3">
          <img src="home1.jpg" alt="Image 4" className="image3" />
        </div>
        <div className="image-box3">
          <img src="home2.jpg" alt="Image 4" className="image3" />
        </div>
        <div className="image-box3">
          <img src="home3.jpg" alt="Image 4" className="image3" />
        </div>
        <div className="image-box3">
          <img src="home4.jpg" alt="Image 4" className="image3" />
        </div>
        <div className="image-box3">
          <img src="home5.jpg" alt="Image 4" className="image3" />
        </div>
        <div className="image-box3">
          <img src="home6.jpg" alt="Image 4" className="image3" />
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
