// useTransition örneği - UI duyarlılığını korurken ağır işlemleri yönetme
import { useState, useTransition } from 'react';

// Büyük veri listesi simülasyonu
const buyukVeriListesi = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  text: `Item ${index + 1}`
}));

function TransitionExample() {
  const [isPending, startTransition] = useTransition();
  const [aramaMetni, setAramaMetni] = useState('');
  const [filtrelenmisListe, setFiltrelenmisListe] = useState(buyukVeriListesi);

  const handleArama = (e) => {
    // Input değerini hemen güncelle (yüksek öncelikli)
    const yeniAramaMetni = e.target.value;
    setAramaMetni(yeniAramaMetni);

    // Filtreleme işlemini düşük öncelikli olarak işaretle
    startTransition(() => {
      const yeniListe = buyukVeriListesi.filter(item =>
        item.text.toLowerCase().includes(yeniAramaMetni.toLowerCase())
      );
      setFiltrelenmisListe(yeniListe);
    });
  };

  return (
    <div>
      <h2>useTransition Örneği - UI Duyarlılığı</h2>
      
      <input
        type="text"
        value={aramaMetni}
        onChange={handleArama}
        placeholder="Listede ara..."
      />

      {isPending ? (
        <p>Filtreleniyor...</p>
      ) : (
        <ul style={{ height: '200px', overflow: 'auto' }}>
          {filtrelenmisListe.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      )}

      <p>
        Not: Input'a yazı yazıldığında, input değeri hemen güncellenir (yüksek öncelikli).
        Liste filtreleme işlemi ise useTransition ile düşük öncelikli olarak işaretlenir.
        Bu sayede UI duyarlı kalır ve kullanıcı deneyimi iyileşir.
      </p>
    </div>
  );
}

export default TransitionExample;
