// useRef Example - DOM access and persistent values
// useRef Örneği - DOM erişimi ve kalıcı değerler
import React, { useRef, useEffect, useState } from 'react';
import HookDescription from './HookDescription';

function RefExample() {
  // DOM element reference
  // DOM elementi referansı
  const inputRef = useRef(null);

  // Persistent value between renders (doesn't cause re-render)
  // Render'lar arası kalıcı değer (yeniden render'a neden olmaz)
  const renderCount = useRef(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  // Increment render count on each render
  // Her render'da render sayısını artır
  useEffect(() => {
    renderCount.current += 1;
  });

  // Focus input on component mount
  // Component mount olduğunda input'a odaklan
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle input submission
  // Input gönderimini işle
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setHistory(prev => [...prev, input]);
      setInput('');
      // Focus back to input after submission
      // Gönderdikten sonra input'a geri odaklan
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Highlight and focus input
  // Input'u vurgula ve odaklan
  const handleHighlight = () => {
    if (!inputRef.current) return;

    inputRef.current.focus();
    inputRef.current.style.backgroundColor = '#fff3cd';
    inputRef.current.style.transition = 'background-color 0.3s ease';
    
    // Reset background color after 2 seconds
    // 2 saniye sonra arka plan rengini sıfırla
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.style.backgroundColor = '';
      }
    }, 2000);
  };

  return (
    <div className="ref-example">
      <h2>useRef Example / useRef Örneği</h2>
      
      <div className="card">
        <h3>Input Focus and Manipulation / Input Odaklama ve Manipülasyon</h3>
        <form onSubmit={handleSubmit} className="fade-in">
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type something... / Bir şeyler yazın..."
              className="form-input"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">
              Submit / Gönder
            </button>
            <button type="button" onClick={handleHighlight} className="highlight-button">
              Highlight Input / Input'u Vurgula
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Input History / Girdi Geçmişi</h3>
        <div className="history-list">
          {history.length > 0 ? (
            <ul>
              {history.map((item, index) => (
                <li key={index} className="history-item fade-in">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">No entries yet. / Henüz girdi yok.</p>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Component Stats / Bileşen İstatistikleri</h3>
        <div className="stats">
          <p>
            Render Count / Render Sayısı: <strong>{renderCount.current}</strong>
          </p>
          <p>
            Current Input / Mevcut Girdi: <strong>{input || '(empty/boş)'}</strong>
          </p>
        </div>
      </div>

      <div className="card">
        <h3>Notes / Notlar</h3>
        <ul className="notes-list">
          <li>
            useRef persists values between renders without causing re-renders
            <br />
            useRef, yeniden render'a neden olmadan değerleri render'lar arasında saklar
          </li>
          <li>
            useRef provides direct access to DOM elements
            <br />
            useRef, DOM elementlerine doğrudan erişim sağlar
          </li>
          <li>
            Changes to ref.current don't trigger a re-render
            <br />
            ref.current değişiklikleri yeniden render'ı tetiklemez
          </li>
        </ul>
      </div>

      {/* About useRef Section */}
      <div className="card about-section">
        <h3>About useRef / useRef Hakkında</h3>
        <div className="about-content">
          <div className="about-item">
            <h4>Purpose / Amaç</h4>
            <p>
              useRef provides a way to store mutable values and access DOM elements directly.
              <br />
              useRef, değiştirilebilir değerleri saklamak ve DOM elementlerine doğrudan erişmek için bir yol sağlar.
            </p>
          </div>
          
          <div className="about-item">
            <h4>Use Cases / Kullanım Alanları</h4>
            <ul>
              <li>DOM element access / DOM elementi erişimi</li>
              <li>Storing previous values / Önceki değerleri saklama</li>
              <li>Instance variables / Örnek değişkenler</li>
              <li>Timer IDs / Zamanlayıcı ID'leri</li>
            </ul>
          </div>
          
          <div className="about-item">
            <h4>Benefits / Faydalar</h4>
            <ul>
              <li>Direct DOM manipulation / Doğrudan DOM manipülasyonu</li>
              <li>Persists between renders / Render'lar arası kalıcılık</li>
              <li>No re-render on updates / Güncellemelerde yeniden render yok</li>
            </ul>
          </div>
          
          <div className="about-item">
            <h4>Best Practices / En İyi Uygulamalar</h4>
            <ul>
              <li>Use for DOM refs / DOM ref'leri için kullanın</li>
              <li>Check for null / Null kontrolü yapın</li>
              <li>Avoid overuse for state / State için aşırı kullanmaktan kaçının</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hook Description */}
      <HookDescription hookName="useRef" />
    </div>
  );
}

export default RefExample;
