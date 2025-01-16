# React Context API

## Context API Nedir?

Context API, React uygulamalarında prop drilling sorununu çözmek için geliştirilmiş bir state yönetim sistemidir. Prop drilling, verilerin üst bileşenden alt bileşenlere props aracılığıyla aktarılması sürecinde, arada bulunan ancak bu verilere ihtiyaç duymayan bileşenlere de props geçilmesi durumudur.

## Context API'nin Amacı

- Uygulama genelinde paylaşılması gereken verileri (tema, dil, kullanıcı bilgileri vb.) merkezi bir yerden yönetmek
- Prop drilling sorununu ortadan kaldırmak
- Bileşenler arası veri paylaşımını kolaylaştırmak
- Kod tekrarını azaltmak

## Context API'nin Faydaları

1. **Basitlik**: Redux gibi karmaşık state yönetim sistemlerine göre daha basit bir API sunar
2. **Entegrasyon Kolaylığı**: React'in built-in özelliği olduğu için ek paket gerektirmez
3. **Performans**: Küçük ve orta ölçekli uygulamalar için yeterli performans sağlar
4. **Kod Okunabilirliği**: Prop drilling'i azaltarak kodun daha okunabilir olmasını sağlar

## Nasıl Kullanılır?

### 1. Context Oluşturma

```javascript
// context/task.js
import { createContext } from 'react';

const TaskContext = createContext();
```

### 2. Provider Tanımlama

```javascript
function Provider({ children }) {
  const [tasks, setTasks] = useState([]);
  
  const sharedValues = {
    tasks,
    setTasks
  };

  return (
    <TaskContext.Provider value={sharedValues}>
      {children}
    </TaskContext.Provider>
  );
}
```

### 3. Provider'ı Uygulamaya Sarmalama

```javascript
// index.js
import { Provider } from './context/task';

root.render(
  <Provider>
    <App />
  </Provider>
);
```

### 4. Context'i Kullanma

```javascript
// herhangi bir bileşen
import { useContext } from 'react';
import TaskContext from './context/task';

function TaskList() {
  const { tasks, setTasks } = useContext(TaskContext);
  
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
```

## Örnek Kullanım Senaryoları

1. **Tema Değiştirme**:
```javascript
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

2. **Kullanıcı Yetkilendirme**:
```javascript
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Ne Zaman Kullanılmalı?

- Uygulama genelinde paylaşılması gereken veriler olduğunda
- Prop drilling sorunu yaşandığında
- Global state yönetimi gerektiğinde (küçük-orta ölçekli uygulamalar için)
- Tema, dil, kullanıcı bilgileri gibi genel verilerin yönetiminde

## Ne Zaman Kullanılmamalı?

- Çok büyük ölçekli uygulamalarda (Redux tercih edilebilir)
- Sık güncellenen veriler için (performans sorunları yaşanabilir)
- Sadece birkaç seviye prop geçişi varsa (normal props kullanımı yeterli olabilir)

---

# React Context API (English)

## What is Context API?

Context API is a state management system developed to solve the prop drilling problem in React applications. Prop drilling occurs when props need to be passed through intermediate components that don't need the data themselves, just to get it to lower components in the tree.

## Purpose of Context API

- Manage shared data (theme, language, user information, etc.) from a central location
- Eliminate prop drilling issues
- Facilitate data sharing between components
- Reduce code repetition

## Benefits of Context API

1. **Simplicity**: Offers a simpler API compared to complex state management systems like Redux
2. **Easy Integration**: No additional packages required as it's a built-in React feature
3. **Performance**: Provides sufficient performance for small to medium-sized applications
4. **Code Readability**: Improves code readability by reducing prop drilling

## How to Use?

### 1. Creating Context

```javascript
// context/task.js
import { createContext } from 'react';

const TaskContext = createContext();
```

### 2. Defining Provider

```javascript
function Provider({ children }) {
  const [tasks, setTasks] = useState([]);
  
  const sharedValues = {
    tasks,
    setTasks
  };

  return (
    <TaskContext.Provider value={sharedValues}>
      {children}
    </TaskContext.Provider>
  );
}
```

### 3. Wrapping Application with Provider

```javascript
// index.js
import { Provider } from './context/task';

root.render(
  <Provider>
    <App />
  </Provider>
);
```

### 4. Using Context

```javascript
// any component
import { useContext } from 'react';
import TaskContext from './context/task';

function TaskList() {
  const { tasks, setTasks } = useContext(TaskContext);
  
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
```

## Example Use Cases

1. **Theme Switching**:
```javascript
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

2. **User Authentication**:
```javascript
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## When to Use?

- When you have data that needs to be shared across the application
- When you're experiencing prop drilling issues
- When you need global state management (for small to medium-sized applications)
- For managing general data like themes, language, user information

## When Not to Use?

- In very large-scale applications (Redux might be preferred)
- For frequently updating data (may cause performance issues)
- When you only have a few levels of prop passing (normal props usage might be sufficient)
