// Component for displaying hook descriptions
// Hook açıklamalarını gösteren bileşen
import React from 'react';

const HookDescription = ({ hookName }) => {
  const descriptions = {
    useReducer: {
      title: 'useReducer',
      description: {
        en: `useReducer is a React Hook for managing complex state logic in React applications. It's particularly useful when:
          • You have complex state logic involving multiple sub-values
          • The next state depends on the previous state
          • You want to improve performance for components that trigger deep updates
          
          Common use cases:
          • Form handling with multiple fields
          • Game state management
          • Shopping cart functionality
          • Any state that involves multiple related pieces of data`,
        tr: `useReducer, React uygulamalarında karmaşık durum mantığını yönetmek için kullanılan bir React Hook'udur. Özellikle şu durumlarda kullanışlıdır:
          • Birden fazla alt değer içeren karmaşık durum mantığınız olduğunda
          • Sonraki durum önceki duruma bağlı olduğunda
          • Derin güncellemeler tetikleyen bileşenlerin performansını iyileştirmek istediğinizde
          
          Yaygın kullanım alanları:
          • Çoklu alan içeren form işlemleri
          • Oyun durumu yönetimi
          • Alışveriş sepeti işlevselliği
          • Birbiriyle ilişkili birden fazla veri parçası içeren durumlar`
      }
    },
    useMemo: {
      title: 'useMemo',
      description: {
        en: `useMemo is a React Hook that memoizes expensive computations. It's essential for:
          • Optimizing performance by avoiding expensive recalculations
          • Maintaining referential equality for complex objects
          • Preventing unnecessary re-renders
          
          Best used when:
          • You have computationally expensive operations
          • You need to maintain consistent references
          • You want to optimize child component re-renders`,
        tr: `useMemo, maliyetli hesaplamaları önbelleğe alan bir React Hook'udur. Şunlar için önemlidir:
          • Maliyetli yeniden hesaplamaları önleyerek performansı optimize etme
          • Karmaşık nesneler için referans eşitliğini koruma
          • Gereksiz yeniden render'ları önleme
          
          En iyi kullanım alanları:
          • Hesaplama açısından maliyetli işlemleriniz olduğunda
          • Tutarlı referansları korumanız gerektiğinde
          • Alt bileşen render'larını optimize etmek istediğinizde`
      }
    },
    useCallback: {
      title: 'useCallback',
      description: {
        en: `useCallback is a React Hook that memoizes functions. It's crucial for:
          • Preventing unnecessary re-renders of child components
          • Maintaining function reference stability
          • Optimizing performance in callback-heavy applications
          
          Particularly useful when:
          • Passing callbacks to optimized child components
          • Working with hooks that depend on functions
          • Managing event handlers in large applications`,
        tr: `useCallback, fonksiyonları önbelleğe alan bir React Hook'udur. Şunlar için çok önemlidir:
          • Alt bileşenlerin gereksiz yeniden render'larını önleme
          • Fonksiyon referans kararlılığını koruma
          • Callback yoğun uygulamalarda performans optimizasyonu
          
          Özellikle şu durumlarda faydalıdır:
          • Optimize edilmiş alt bileşenlere callback'ler geçerken
          • Fonksiyonlara bağımlı hook'larla çalışırken
          • Büyük uygulamalarda olay işleyicilerini yönetirken`
      }
    },
    useRef: {
      title: 'useRef',
      description: {
        en: `useRef is a React Hook that provides a mutable reference that persists across renders. Key uses include:
          • Accessing DOM elements directly
          • Storing mutable values that don't require re-renders
          • Keeping track of previous values
          
          Common applications:
          • Managing focus, text selection, or media playback
          • Triggering imperative animations
          • Integrating with third-party DOM libraries`,
        tr: `useRef, render'lar arasında kalıcı olan değiştirilebilir bir referans sağlayan React Hook'udur. Temel kullanım alanları:
          • DOM elementlerine doğrudan erişim
          • Yeniden render gerektirmeyen değiştirilebilir değerleri saklama
          • Önceki değerleri takip etme
          
          Yaygın uygulamalar:
          • Odaklama, metin seçimi veya medya oynatma kontrolü
          • Zorunlu animasyonları tetikleme
          • Üçüncü taraf DOM kütüphaneleriyle entegrasyon`
      }
    },
    useTransition: {
      title: 'useTransition',
      description: {
        en: `useTransition is a React Hook for managing state updates with different priorities. It's valuable for:
          • Improving user interface responsiveness
          • Handling expensive state updates
          • Managing concurrent rendering
          
          Best used for:
          • Large data set filtering
          • Complex UI updates
          • Improving user experience during heavy computations`,
        tr: `useTransition, farklı önceliklere sahip durum güncellemelerini yöneten bir React Hook'udur. Şunlar için değerlidir:
          • Kullanıcı arayüzü duyarlılığını iyileştirme
          • Maliyetli durum güncellemelerini yönetme
          • Eşzamanlı render işlemlerini yönetme
          
          En iyi kullanım alanları:
          • Büyük veri kümesi filtreleme
          • Karmaşık UI güncellemeleri
          • Ağır hesaplamalar sırasında kullanıcı deneyimini iyileştirme`
      }
    },
    useDeferredValue: {
      title: 'useDeferredValue',
      description: {
        en: `useDeferredValue is a React Hook that defers updating less important parts of the screen. Benefits include:
          • Keeping the user interface responsive
          • Handling expensive rendering operations
          • Optimizing user experience during updates
          
          Ideal for:
          • Search results display
          • Large list rendering
          • Real-time filtering of data`,
        tr: `useDeferredValue, ekranın daha az önemli kısımlarının güncellenmesini erteleyen bir React Hook'udur. Faydaları:
          • Kullanıcı arayüzünü duyarlı tutma
          • Maliyetli render işlemlerini yönetme
          • Güncellemeler sırasında kullanıcı deneyimini optimize etme
          
          İdeal kullanım alanları:
          • Arama sonuçları gösterimi
          • Büyük liste render'lama
          • Gerçek zamanlı veri filtreleme`
      }
    },
    customHooks: {
      title: 'Custom Hooks',
      description: {
        en: `Custom Hooks are reusable functions that contain component logic. They are powerful for:
          • Code reusability across components
          • Separating concerns and improving maintainability
          • Creating specialized, shareable functionality
          
          Perfect for:
          • Form handling logic
          • Data fetching patterns
          • Subscription management
          • Any reusable stateful logic`,
        tr: `Custom Hook'lar, bileşen mantığını içeren yeniden kullanılabilir fonksiyonlardır. Şunlar için güçlüdür:
          • Bileşenler arası kod yeniden kullanılabilirliği
          • İlgileri ayırma ve bakım kolaylığını artırma
          • Özelleştirilmiş, paylaşılabilir işlevsellik oluşturma
          
          Şunlar için mükemmeldir:
          • Form işleme mantığı
          • Veri çekme kalıpları
          • Abonelik yönetimi
          • Herhangi bir yeniden kullanılabilir durumsal mantık`
      }
    }
  };

  const hookInfo = descriptions[hookName];
  if (!hookInfo) return null;

  return (
    <div className="hook-description card">
      <h3>About {hookInfo.title} / {hookInfo.title} Hakkında</h3>
      
      <div className="description-content">
        <div className="description-section">
          <h4>English</h4>
          <p>{hookInfo.description.en}</p>
        </div>
        
        <div className="description-section">
          <h4>Türkçe</h4>
          <p>{hookInfo.description.tr}</p>
        </div>
      </div>
    </div>
  );
};

export default HookDescription;
