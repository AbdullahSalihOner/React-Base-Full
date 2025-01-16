# React Hooks Rehberi

## 1. useReducer Hook

useReducer, karmaşık state yönetimi için useState'in alternatifidir. Redux benzeri bir state yönetim yapısı sunar.

### Kullanımı ve Faydaları:
- Karmaşık state mantığını yönetmek için idealdir
- Birbiriyle ilişkili state'leri tek bir yerde yönetebilirsiniz
- State güncellemelerini daha öngörülebilir hale getirir

```javascript
import { useReducer } from 'react';

// Reducer fonksiyonu
const reducer = (state, action) => {
  switch (action.type) {
    case 'ARTIR':
      return { sayac: state.sayac + 1 };
    case 'AZALT':
      return { sayac: state.sayac - 1 };
    default:
      return state;
  }
};

function Sayac() {
  const [state, dispatch] = useReducer(reducer, { sayac: 0 });

  return (
    <div>
      <p>Sayaç: {state.sayac}</p>
      <button onClick={() => dispatch({ type: 'ARTIR' })}>Artır</button>
      <button onClick={() => dispatch({ type: 'AZALT' })}>Azalt</button>
    </div>
  );
}
```

## 2. useMemo Hook

useMemo, pahalı hesaplamaların sonuçlarını önbelleğe alır ve gereksiz yeniden hesaplamaları önler.

### Kullanımı ve Faydaları:
- Performans optimizasyonu sağlar
- Gereksiz hesaplamaları önler
- Bağımlılıklar değişmediğinde önceki değeri kullanır

```javascript
import { useMemo, useState } from 'react';

function AgirHesaplama() {
  const [sayi, setSayi] = useState(0);
  
  const karmaşıkHesaplama = useMemo(() => {
    // Ağır bir hesaplama
    return sayi * sayi * 1000;
  }, [sayi]); // Sadece sayi değiştiğinde yeniden hesapla

  return (
    <div>
      <input value={sayi} onChange={e => setSayi(Number(e.target.value))} />
      <p>Sonuç: {karmaşıkHesaplama}</p>
    </div>
  );
}
```

## 3. useCallback Hook

useCallback, fonksiyonları önbelleğe alır ve gereksiz yeniden oluşturulmaları önler.

### Kullanımı ve Faydaları:
- Fonksiyon referanslarının kararlılığını sağlar
- Child component'lerin gereksiz render'larını önler
- React.memo ile birlikte kullanıldığında çok etkilidir

```javascript
import { useCallback, useState } from 'react';

function EbeveynBileşen() {
  const [sayac, setSayac] = useState(0);

  const artirCallback = useCallback(() => {
    setSayac(s => s + 1);
  }, []); // Boş dependency array - fonksiyon asla değişmez

  return (
    <div>
      <p>Sayaç: {sayac}</p>
      <CocukBilesen onArtir={artirCallback} />
    </div>
  );
}
```

## 4. useRef Hook

useRef, DOM elementlerine doğrudan erişim ve render'lar arasında değer saklamak için kullanılır.

### Kullanımı ve Faydaları:
- DOM elementlerine erişim sağlar
- Render'lar arasında değer saklar
- Değişiklikler render tetiklemez

```javascript
import { useRef, useEffect } from 'react';

function OtomatikFokus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Component mount olduğunda input'a fokuslan
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

## 5. useTransition Hook

useTransition, kullanıcı arayüzünün duyarlılığını korurken ağır güncellemeleri işaretlememizi sağlar.

### Kullanımı ve Faydaları:
- UI yanıt verebilirliğini korur
- Ağır işlemleri düşük öncelikli olarak işaretler
- Kullanıcı deneyimini iyileştirir

```javascript
import { useTransition, useState } from 'react';

function AramaListesi() {
  const [isPending, startTransition] = useTransition();
  const [aramaMetni, setAramaMetni] = useState('');
  const [sonuclar, setSonuclar] = useState([]);

  const handleArama = (e) => {
    setAramaMetni(e.target.value);
    startTransition(() => {
      // Ağır filtreleme işlemi
      const yeniSonuclar = buyukVeri.filter(item => 
        item.includes(e.target.value)
      );
      setSonuclar(yeniSonuclar);
    });
  };

  return (
    <div>
      <input value={aramaMetni} onChange={handleArama} />
      {isPending ? (
        <p>Yükleniyor...</p>
      ) : (
        <ul>{sonuclar.map(item => <li key={item}>{item}</li>)}</ul>
      )}
    </div>
  );
}
```

## 6. useDeferredValue Hook

useDeferredValue, değerin gecikmeli bir versiyonunu oluşturarak UI'ın duyarlı kalmasını sağlar.

### Kullanımı ve Faydaları:
- Ağır render'ları erteler
- UI yanıt verebilirliğini korur
- Debouncing benzeri bir etki sağlar

```javascript
import { useDeferredValue, useState } from 'react';

function GecikmeligListe() {
  const [metin, setMetin] = useState('');
  const gecikmeliMetin = useDeferredValue(metin);

  return (
    <div>
      <input value={metin} onChange={e => setMetin(e.target.value)} />
      <AgirListeBileseni metin={gecikmeliMetin} />
    </div>
  );
}
```

## 7. Custom Hook Oluşturma

Custom Hook'lar, tekrar kullanılabilir mantığı paylaşmanın yoludur.

### Kullanımı ve Faydaları:
- Kod tekrarını azaltır
- Mantığı tekrar kullanılabilir hale getirir
- Bileşen mantığını ayırır

### Örnek 1: Sayaç Custom Hook'u

```javascript
// useCounter.js
import { useState } from 'react';

function useCounter(baslangicDegeri = 0) {
  const [sayac, setSayac] = useState(baslangicDegeri);

  const artir = () => setSayac(s => s + 1);
  const azalt = () => setSayac(s => s - 1);
  const sifirla = () => setSayac(baslangicDegeri);

  return { sayac, artir, azalt, sifirla };
}

// Kullanımı
function SayacBileseni() {
  const { sayac, artir, azalt, sifirla } = useCounter(0);

  return (
    <div>
      <p>Sayaç: {sayac}</p>
      <button onClick={artir}>Artır</button>
      <button onClick={azalt}>Azalt</button>
      <button onClick={sifirla}>Sıfırla</button>
    </div>
  );
}
```

### Örnek 2: Form Custom Hook'u

```javascript
// useForm.js
import { useState } from 'react';

function useForm(baslangicDegerler = {}) {
  const [degerler, setDegerler] = useState(baslangicDegerler);
  const [hatalar, setHatalar] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDegerler(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    // Form doğrulama mantığı burada
    const yeniHatalar = {};
    if (!degerler.email) yeniHatalar.email = 'Email gerekli';
    if (!degerler.sifre) yeniHatalar.sifre = 'Şifre gerekli';

    setHatalar(yeniHatalar);

    if (Object.keys(yeniHatalar).length === 0) {
      onSubmit(degerler);
    }
  };

  return {
    degerler,
    hatalar,
    handleChange,
    handleSubmit
  };
}

// Kullanımı
function GirisBileseni() {
  const { degerler, hatalar, handleChange, handleSubmit } = useForm({
    email: '',
    sifre: ''
  });

  const formGonder = (formDegerler) => {
    console.log('Form gönderildi:', formDegerler);
  };

  return (
    <form onSubmit={handleSubmit(formGonder)}>
      <div>
        <input
          name="email"
          value={degerler.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {hatalar.email && <p>{hatalar.email}</p>}
      </div>
      <div>
        <input
          name="sifre"
          type="password"
          value={degerler.sifre}
          onChange={handleChange}
          placeholder="Şifre"
        />
        {hatalar.sifre && <p>{hatalar.sifre}</p>}
      </div>
      <button type="submit">Giriş Yap</button>
    </form>
  );
}
```

Bu hook'lar React uygulamalarınızda kod organizasyonunu iyileştirir, performansı artırır ve geliştirme sürecini hızlandırır. Her hook'un kendine özgü kullanım alanı ve avantajları vardır.

---

# React Hooks Guide (English)

## 1. useReducer Hook

useReducer is an alternative to useState for managing complex state logic. It provides a Redux-like state management structure.

### Usage and Benefits:
- Ideal for managing complex state logic
- Manage related state values in one place
- Makes state updates more predictable

```javascript
import { useReducer } from 'react';

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
}
```

## 2. useMemo Hook

useMemo caches the results of expensive calculations and prevents unnecessary recalculations.

### Usage and Benefits:
- Provides performance optimization
- Prevents unnecessary calculations
- Uses previous value when dependencies haven't changed

```javascript
import { useMemo, useState } from 'react';

function ExpensiveCalculation() {
  const [number, setNumber] = useState(0);
  
  const complexCalculation = useMemo(() => {
    // Expensive calculation
    return number * number * 1000;
  }, [number]); // Recalculate only when number changes

  return (
    <div>
      <input value={number} onChange={e => setNumber(Number(e.target.value))} />
      <p>Result: {complexCalculation}</p>
    </div>
  );
}
```

## 3. useCallback Hook

useCallback caches functions and prevents unnecessary recreations.

### Usage and Benefits:
- Ensures function reference stability
- Prevents unnecessary renders of child components
- Very effective when used with React.memo

```javascript
import { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const incrementCallback = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependency array - function never changes

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onIncrement={incrementCallback} />
    </div>
  );
}
```

## 4. useRef Hook

useRef is used for direct DOM access and storing values between renders.

### Usage and Benefits:
- Provides access to DOM elements
- Stores values between renders
- Changes don't trigger re-renders

```javascript
import { useRef, useEffect } from 'react';

function AutoFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

## 5. useTransition Hook

useTransition allows us to mark updates as transitions while maintaining UI responsiveness.

### Usage and Benefits:
- Maintains UI responsiveness
- Marks heavy operations as low priority
- Improves user experience

```javascript
import { useTransition, useState } from 'react';

function SearchList() {
  const [isPending, startTransition] = useTransition();
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    startTransition(() => {
      // Heavy filtering operation
      const newResults = largeData.filter(item => 
        item.includes(e.target.value)
      );
      setResults(newResults);
    });
  };

  return (
    <div>
      <input value={searchText} onChange={handleSearch} />
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <ul>{results.map(item => <li key={item}>{item}</li>)}</ul>
      )}
    </div>
  );
}
```

## 6. useDeferredValue Hook

useDeferredValue creates a deferred version of a value to keep UI responsive.

### Usage and Benefits:
- Defers heavy renders
- Maintains UI responsiveness
- Provides debouncing-like effect

```javascript
import { useDeferredValue, useState } from 'react';

function DeferredList() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <HeavyListComponent text={deferredText} />
    </div>
  );
}
```

## 7. Creating Custom Hooks

Custom Hooks are a way to share reusable logic.

### Usage and Benefits:
- Reduces code duplication
- Makes logic reusable
- Separates component logic

### Example 1: Counter Custom Hook

```javascript
// useCounter.js
import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Usage
function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Example 2: Form Custom Hook

```javascript
// useForm.js
import { useState } from 'react';

function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    // Form validation logic here
    const newErrors = {};
    if (!values.email) newErrors.email = 'Email is required';
    if (!values.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit
  };
}

// Usage
function LoginComponent() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    email: '',
    password: ''
  });

  const submitForm = (formValues) => {
    console.log('Form submitted:', formValues);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
```

These hooks improve code organization, enhance performance, and speed up the development process in your React applications. Each hook has its own specific use case and advantages.
