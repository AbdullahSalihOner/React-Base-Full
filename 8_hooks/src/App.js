import { useState } from 'react';
import './App.css';
import ReducerExample from './components/ReducerExample';
import MemoExample from './components/MemoExample';
import CallbackExample from './components/CallbackExample';
import RefExample from './components/RefExample';
import TransitionExample from './components/TransitionExample';
import DeferredValueExample from './components/DeferredValueExample';
import CustomHookExample from './components/CustomHookExample';

function App() {
  // State for active component tracking
  // Aktif bileşeni takip eden state
  const [activeComponent, setActiveComponent] = useState('reducer');

  // Component map with titles in both languages
  // İki dilde başlıklarla birlikte bileşen haritası
  const components = {
    reducer: { 
      component: ReducerExample, 
      title: 'useReducer Example / Örneği',
      description: 'Complex state management with actions / Aksiyonlarla karmaşık state yönetimi'
    },
    memo: { 
      component: MemoExample, 
      title: 'useMemo Example / Örneği',
      description: 'Performance optimization for expensive calculations / Maliyetli hesaplamalar için performans optimizasyonu'
    },
    callback: { 
      component: CallbackExample, 
      title: 'useCallback Example / Örneği',
      description: 'Function memoization for child components / Alt bileşenler için fonksiyon önbellekleme'
    },
    ref: { 
      component: RefExample, 
      title: 'useRef Example / Örneği',
      description: 'DOM access and value persistence / DOM erişimi ve değer kalıcılığı'
    },
    transition: { 
      component: TransitionExample, 
      title: 'useTransition Example / Örneği',
      description: 'UI responsiveness for heavy updates / Ağır güncellemeler için UI duyarlılığı'
    },
    deferred: { 
      component: DeferredValueExample, 
      title: 'useDeferredValue Example / Örneği',
      description: 'Deferred value updates / Ertelenmiş değer güncellemeleri'
    },
    custom: { 
      component: CustomHookExample, 
      title: 'Custom Hooks Example / Örneği',
      description: 'Reusable logic with custom hooks / Özel hook\'lar ile yeniden kullanılabilir mantık'
    }
  };

  // Get active component
  // Aktif bileşeni al
  const ActiveComponent = components[activeComponent]?.component || components.reducer.component;

  return (
    <div className="App">
      <h1>React Hooks Examples / React Hooks Örnekleri</h1>
      
      {/* Navigation menu / Navigasyon menüsü */}
      <nav>
        {Object.entries(components).map(([key, { title, description }]) => (
          <button
            key={key}
            onClick={() => setActiveComponent(key)}
            className={`nav-button ${activeComponent === key ? 'active' : ''}`}
            title={description}
          >
            {title}
          </button>
        ))}
      </nav>

      {/* Active component container / Aktif bileşen konteyneri */}
      <div className="content-container fade-in">
        <ActiveComponent />
      </div>

      {/* Footer with description / Açıklamalı alt bilgi */}
      <footer>
        <p className="description">
          {components[activeComponent]?.description}
        </p>
        <p className="app-description">
          This application demonstrates the usage of React Hooks with real-world examples.
          <br />
          Bu uygulama React Hooks'ların gerçek dünya örnekleriyle kullanımını göstermektedir.
        </p>
      </footer>
    </div>
  );
}

export default App;
