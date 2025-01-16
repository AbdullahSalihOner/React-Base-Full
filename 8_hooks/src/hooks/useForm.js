// Custom Hook örneği - Form yönetimi
import { useState, useCallback } from 'react';

function useForm(baslangicDegerler = {}) {
  const [degerler, setDegerler] = useState(baslangicDegerler);
  const [hatalar, setHatalar] = useState({});
  const [yukleniyor, setYukleniyor] = useState(false);

  // Form değerlerini güncelleme
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setDegerler(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Değer değiştiğinde ilgili hatayı temizle
    setHatalar(prev => ({
      ...prev,
      [name]: ''
    }));
  }, []);

  // Form doğrulama
  const dogrula = useCallback((kurallar = {}) => {
    const yeniHatalar = {};
    Object.keys(kurallar).forEach(alan => {
      const deger = degerler[alan];
      const kural = kurallar[alan];

      if (kural.gerekli && !deger) {
        yeniHatalar[alan] = `${alan} alanı gereklidir`;
      } else if (kural.minUzunluk && deger.length < kural.minUzunluk) {
        yeniHatalar[alan] = `${alan} en az ${kural.minUzunluk} karakter olmalıdır`;
      } else if (kural.email && !/\S+@\S+\.\S+/.test(deger)) {
        yeniHatalar[alan] = 'Geçerli bir email adresi giriniz';
      }
    });

    setHatalar(yeniHatalar);
    return Object.keys(yeniHatalar).length === 0;
  }, [degerler]);

  // Form gönderme
  const handleSubmit = useCallback((onSubmit, dogrulamaKurallari) => async (e) => {
    e.preventDefault();
    
    if (dogrulamaKurallari && !dogrula(dogrulamaKurallari)) {
      return;
    }

    try {
      setYukleniyor(true);
      await onSubmit(degerler);
      // Başarılı gönderim sonrası formu sıfırla
      setDegerler(baslangicDegerler);
      setHatalar({});
    } catch (error) {
      setHatalar({ form: error.message });
    } finally {
      setYukleniyor(false);
    }
  }, [degerler, baslangicDegerler, dogrula]);

  // Formu sıfırlama
  const formSifirla = useCallback(() => {
    setDegerler(baslangicDegerler);
    setHatalar({});
  }, [baslangicDegerler]);

  return {
    degerler,
    hatalar,
    yukleniyor,
    handleChange,
    handleSubmit,
    formSifirla
  };
}

export default useForm;
