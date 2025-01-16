// useDeferredValue Example - Deferred value updates for better performance
// useDeferredValue Örneği - Daha iyi performans için ertelenmiş değer güncellemeleri
import { useState, useDeferredValue, memo } from 'react';
import HookDescription from './HookDescription';

// Heavy list component (wrapped with memo)
// Ağır liste bileşeni (memo ile sarmalanmış)
const HeavyList = memo(({ text }) => {
  // Simulate heavy computation
  // Ağır hesaplama simülasyonu
  const items = [];
  for (let i = 0; i < 10000; i++) {
    if (text && i % 10 === 0) {
      items.push(
        <div key={i} className="list-item fade-in">
          {text} - {i}
        </div>
      );
    } else {
      items.push(
        <div key={i} className="list-item">
          Item {i}
        </div>
      );
    }
  }

  return (
    <div className="heavy-list card">
      {items}
    </div>
  );
});

function DeferredValueExample() {
  const [text, setText] = useState('');
  // Create deferred version of text
  // Metnin ertelenmiş versiyonunu oluştur
  const deferredText = useDeferredValue(text);

  // Calculate if we're showing stale content
  // Eski içerik gösterilip gösterilmediğini hesapla
  const isStale = text !== deferredText;

  return (
    <div className="card">
      <h2>useDeferredValue Example / useDeferredValue Örneği</h2>

      <div className="input-section card">
        <h3>Search Input / Arama Girişi</h3>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type to filter... / Filtrelemek için yazın..."
          className="search-input"
        />
        
        <div className="status-indicator">
          {isStale && (
            <p className="stale-notice">
              Updating... / Güncelleniyor...
            </p>
          )}
        </div>
      </div>

      <div className="results-section card">
        <h3>Results / Sonuçlar</h3>
        <div style={{ opacity: isStale ? 0.5 : 1, transition: 'opacity 0.2s ease' }}>
          <HeavyList text={deferredText} />
        </div>
      </div>

      <div className="info-section card">
        <h3>Current State / Mevcut Durum</h3>
        <p>
          Current Text / Anlık Metin: <strong>{text}</strong>
          <br />
          Deferred Text / Ertelenmiş Metin: <strong>{deferredText}</strong>
        </p>
      </div>

      {/* About useDeferredValue Section */}
      <div className="card about-section">
        <h3>About useDeferredValue / useDeferredValue Hakkında</h3>
        <div className="about-content">
          <div className="about-item">
            <h4>Purpose / Amaç</h4>
            <p>
              useDeferredValue allows you to defer updating a part of the UI to avoid blocking the main thread.
              <br />
              useDeferredValue, ana iş parçacığını bloke etmemek için UI'ın bir kısmının güncellenmesini ertelemenizi sağlar.
            </p>
          </div>
          
          <div className="about-item">
            <h4>Use Cases / Kullanım Alanları</h4>
            <ul>
              <li>Large lists rendering / Büyük liste render'ları</li>
              <li>Search results / Arama sonuçları</li>
              <li>Heavy UI updates / Ağır UI güncellemeleri</li>
              <li>Data visualization / Veri görselleştirme</li>
            </ul>
          </div>
          
          <div className="about-item">
            <h4>Benefits / Faydalar</h4>
            <ul>
              <li>Improved responsiveness / Gelişmiş yanıt verme süresi</li>
              <li>Smoother user experience / Daha akıcı kullanıcı deneyimi</li>
              <li>Better performance / Daha iyi performans</li>
            </ul>
          </div>
          
          <div className="about-item">
            <h4>Best Practices / En İyi Uygulamalar</h4>
            <ul>
              <li>Use for non-urgent updates / Acil olmayan güncellemeler için kullanın</li>
              <li>Show loading states / Yükleme durumlarını gösterin</li>
              <li>Consider useTransition / useTransition'ı değerlendirin</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hook Description */}
      <HookDescription hookName="useDeferredValue" />
    </div>
  );
}

export default DeferredValueExample;
