// Custom Hook kullanım örneği
import { useState } from 'react';
import useCounter from '../hooks/useCounter';
import useForm from '../hooks/useForm';

function CustomHookExample() {
  const [adim, setAdim] = useState(1);
  
  // useCounter hook'unu kullan
  const { 
    sayac, 
    artir, 
    azalt, 
    sifirla, 
    degerAyarla 
  } = useCounter(0, adim);

  // useForm hook'unu kullan
  const {
    degerler,
    hatalar,
    yukleniyor,
    handleChange,
    handleSubmit,
    formSifirla
  } = useForm({
    email: '',
    sifre: '',
    hatirla: false
  });

  // Form gönderim simülasyonu
  const formGonder = async (formDegerler) => {
    // API çağrısı simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form gönderildi:', formDegerler);
  };

  // Form doğrulama kuralları
  const dogrulamaKurallari = {
    email: { gerekli: true, email: true },
    sifre: { gerekli: true, minUzunluk: 6 }
  };

  return (
    <div>
      <h2>Custom Hooks Örnekleri</h2>

      {/* useCounter Örneği */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>useCounter Hook Örneği</h3>
        <div>
          <label>
            Artış/Azalış Adımı:
            <input
              type="number"
              value={adim}
              onChange={(e) => setAdim(Number(e.target.value))}
              min="1"
            />
          </label>
        </div>
        <p>Sayaç: {sayac}</p>
        <button onClick={artir}>Artır</button>
        <button onClick={azalt}>Azalt</button>
        <button onClick={sifirla}>Sıfırla</button>
        <button onClick={() => degerAyarla(100)}>100'e Ayarla</button>
      </div>

      {/* useForm Örneği */}
      <div>
        <h3>useForm Hook Örneği</h3>
        <form onSubmit={handleSubmit(formGonder, dogrulamaKurallari)}>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={degerler.email}
                onChange={handleChange}
              />
            </label>
            {hatalar.email && <p style={{ color: 'red' }}>{hatalar.email}</p>}
          </div>

          <div>
            <label>
              Şifre:
              <input
                type="password"
                name="sifre"
                value={degerler.sifre}
                onChange={handleChange}
              />
            </label>
            {hatalar.sifre && <p style={{ color: 'red' }}>{hatalar.sifre}</p>}
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                name="hatirla"
                checked={degerler.hatirla}
                onChange={handleChange}
              />
              Beni Hatırla
            </label>
          </div>

          <div>
            <button type="submit" disabled={yukleniyor}>
              {yukleniyor ? 'Gönderiliyor...' : 'Gönder'}
            </button>
            <button type="button" onClick={formSifirla}>
              Formu Sıfırla
            </button>
          </div>

          {hatalar.form && <p style={{ color: 'red' }}>{hatalar.form}</p>}
        </form>
      </div>

      <p>
        Not: Bu örnekte iki farklı custom hook kullanılmıştır:
        <br />
        1. useCounter: Sayaç mantığını yeniden kullanılabilir hale getirir
        <br />
        2. useForm: Form yönetimi mantığını yeniden kullanılabilir hale getirir
      </p>
    </div>
  );
}

export default CustomHookExample;
