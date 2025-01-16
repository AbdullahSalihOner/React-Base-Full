// useCallback örneği - Fonksiyon referanslarının kararlılığını sağlar
import { useCallback, useState, memo } from 'react';

// React.memo ile sarmalanmış alt bileşen
// Sadece props değiştiğinde yeniden render olur
const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  console.log(`TodoItem render: ${todo.text}`);
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Sil</button>
    </li>
  );
});

function CallbackExample() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0);

  // useCallback ile fonksiyonları önbellekleme
  // Bu fonksiyonlar sadece todos state'i değiştiğinde yeniden oluşturulur
  const handleToggle = useCallback((todoId) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // Boş dependency array çünkü setTodos fonksiyonu kararlıdır

  const handleDelete = useCallback((todoId) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  return (
    <div>
      <h2>useCallback Örneği - Performans Optimizasyonu</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yeni görev ekle"
        />
        <button type="submit">Ekle</button>
      </form>

      {/* Bu buton tıklandığında bileşen yeniden render olur ama TodoItem'lar render olmaz */}
      <button onClick={() => setCount(c => c + 1)}>
        Gereksiz Render ({count})
      </button>

      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      
      <p>
        Not: Gereksiz render butonu tıklandığında ana bileşen render olur,
        ancak TodoItem bileşenleri render olmaz çünkü fonksiyonlar useCallback ile önbelleğe alınmıştır.
      </p>
    </div>
  );
}

export default CallbackExample;
