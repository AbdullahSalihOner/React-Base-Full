// useMemo Example - Memoization for expensive calculations
// useMemo Örneği - Pahalı hesaplamalar için önbellekleme
import React, { useState, useMemo } from 'react';
import HookDescription from './HookDescription';

function MemoExample() {
  // State for numbers and array size
  // Sayılar ve dizi boyutu için state
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [arraySize, setArraySize] = useState(1000);
  const [rerenderCount, setRerenderCount] = useState(0);

  // First expensive calculation: Array processing
  // İlk pahalı hesaplama: Dizi işleme
  const processedArray = useMemo(() => {
    console.log('Processing array... / Dizi işleniyor...');
    const result = [];
    for (let i = 0; i < arraySize; i++) {
      result.push({
        index: i,
        value: Math.pow(i, 2) + number1
      });
    }
    return result;
  }, [arraySize, number1]);

  // Second expensive calculation: Mathematical operation
  // İkinci pahalı hesaplama: Matematiksel işlem
  const complexCalculation = useMemo(() => {
    console.log('Performing complex calculation... / Karmaşık hesaplama yapılıyor...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sin(number2) * Math.cos(i);
    }
    return result.toFixed(2);
  }, [number2]);

  // Force rerender without affecting memoized values
  // Önbelleğe alınmış değerleri etkilemeden yeniden render'a zorla
  const handleRerender = () => {
    setRerenderCount(prev => prev + 1);
  };

  return (
    <div className="memo-example">
      <h2>useMemo Example / useMemo Örneği</h2>

      {/* Array Processing Section */}
      <div className="card">
        <h3>Array Processing / Dizi İşleme</h3>
        <div className="calculation-section">
          <div className="input-group">
            <label>
              Array Size / Dizi Boyutu:
              <input
                type="number"
                value={arraySize}
                onChange={(e) => setArraySize(Math.max(0, parseInt(e.target.value) || 0))}
                className="form-input"
                min="0"
                max="10000"
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Base Number / Temel Sayı:
              <input
                type="number"
                value={number1}
                onChange={(e) => setNumber1(parseInt(e.target.value) || 0)}
                className="form-input"
              />
            </label>
          </div>

          <div className="result-section">
            <p>
              Array Length / Dizi Uzunluğu: <strong>{processedArray.length}</strong>
            </p>
            <p>
              First 5 Items / İlk 5 Öğe:
              <br />
              {processedArray.slice(0, 5).map(item => (
                <span key={item.index} className="array-item">
                  {item.value}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Complex Calculation Section */}
      <div className="card">
        <h3>Complex Calculation / Karmaşık Hesaplama</h3>
        <div className="calculation-section">
          <div className="input-group">
            <label>
              Input Number / Giriş Sayısı:
              <input
                type="number"
                value={number2}
                onChange={(e) => setNumber2(parseInt(e.target.value) || 0)}
                className="form-input"
              />
            </label>
          </div>

          <div className="result-section">
            <p>
              Result / Sonuç: <strong>{complexCalculation}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Rerender Test Section */}
      <div className="card">
        <h3>Rerender Test / Yeniden Render Testi</h3>
        <div className="test-section">
          <p>
            Rerender Count / Yeniden Render Sayısı: <strong>{rerenderCount}</strong>
          </p>
          <button onClick={handleRerender} className="rerender-button">
            Force Rerender / Yeniden Render'a Zorla
          </button>
          <p className="info-text">
            Notice: The calculations above don't run again when clicking this button!
            <br />
            Not: Bu butona tıklandığında yukarıdaki hesaplamalar tekrar çalışmaz!
          </p>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="card">
        <h3>How It Works / Nasıl Çalışır</h3>
        <div className="explanation-content">
          <p>
            1. The array processing is memoized and only recalculates when array size or base number changes.
            <br />
            Dizi işleme önbelleğe alınır ve sadece dizi boyutu veya temel sayı değiştiğinde yeniden hesaplanır.
          </p>
          <p>
            2. The complex calculation is memoized and only updates when its input number changes.
            <br />
            Karmaşık hesaplama önbelleğe alınır ve sadece giriş sayısı değiştiğinde güncellenir.
          </p>
          <p>
            3. Clicking the rerender button updates the component but doesn't trigger recalculations.
            <br />
            Yeniden render butonuna tıklamak bileşeni günceller ancak yeniden hesaplamaları tetiklemez.
          </p>
        </div>
      </div>

      {/* About useMemo Section */}
      <div className="card about-section">
        <h3>About useMemo / useMemo Hakkında</h3>
        <div className="about-content">
          <div className="about-item">
            <h4>Purpose / Amaç</h4>
            <p>
              useMemo is used to memoize expensive computations and prevent unnecessary recalculations.
              <br />
              useMemo, pahalı hesaplamaları önbelleğe alır ve gereksiz yeniden hesaplamaları önler.
            </p>
          </div>
          
          <div className="about-item">
            <h4>Use Cases / Kullanım Alanları</h4>
            <ul>
              <li>Complex data transformations / Karmaşık veri dönüşümleri</li>
              <li>Heavy calculations / Ağır hesaplamalar</li>
              <li>Expensive filtering operations / Maliyetli filtreleme işlemleri</li>
              <li>Performance optimization / Performans optimizasyonu</li>
            </ul>
          </div>
          
          <div className="about-item">
            <h4>Benefits / Faydalar</h4>
            <ul>
              <li>Improves performance / Performansı artırır</li>
              <li>Prevents unnecessary renders / Gereksiz render'ları önler</li>
              <li>Optimizes resource usage / Kaynak kullanımını optimize eder</li>
            </ul>
          </div>
          
          <div className="about-item">
            <h4>Best Practices / En İyi Uygulamalar</h4>
            <ul>
              <li>Use for expensive calculations / Maliyetli hesaplamalar için kullanın</li>
              <li>Define clear dependencies / Net bağımlılıklar tanımlayın</li>
              <li>Don't overuse / Aşırı kullanmayın</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hook Description */}
      <HookDescription hookName="useMemo" />
    </div>
  );
}

export default MemoExample;
