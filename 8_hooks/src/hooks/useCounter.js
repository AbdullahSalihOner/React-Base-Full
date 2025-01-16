// Custom Hook örneği - Sayaç mantığı
import { useState, useCallback } from 'react';

function useCounter(baslangicDegeri = 0, adim = 1) {
  const [sayac, setSayac] = useState(baslangicDegeri);

  // Sayaç işlemlerini useCallback ile optimize ediyoruz
  const artir = useCallback(() => {
    setSayac(prev => prev + adim);
  }, [adim]);

  const azalt = useCallback(() => {
    setSayac(prev => prev - adim);
  }, [adim]);

  const sifirla = useCallback(() => {
    setSayac(baslangicDegeri);
  }, [baslangicDegeri]);

  const degerAyarla = useCallback((yeniDeger) => {
    setSayac(yeniDeger);
  }, []);

  return {
    sayac,
    artir,
    azalt,
    sifirla,
    degerAyarla
  };
}

export default useCounter;
