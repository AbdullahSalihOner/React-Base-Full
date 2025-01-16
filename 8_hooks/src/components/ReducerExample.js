// useReducer örneği - Kompleks state yönetimi için kullanılır
import { useReducer } from 'react';
import { useState } from 'react';

// Reducer fonksiyonu - State güncellemelerini yönetir
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'EKLE':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'SIL':
      return state.filter(todo => todo.id !== action.payload);
    case 'TAMAMLA':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

function ReducerExample() {
  // useReducer hook'u - İlk parametre reducer fonksiyonu, ikinci parametre başlangıç state'i
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  // Yeni todo ekleme fonksiyonu
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'EKLE', payload: input });
      setInput('');
    }
  };

  return (
    <div>
      <h2>useReducer Örneği - Todo Listesi</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yeni görev ekle"
        />
        <button type="submit">Ekle</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            <button onClick={() => dispatch({ type: 'TAMAMLA', payload: todo.id })}>
              {todo.completed ? 'Geri Al' : 'Tamamla'}
            </button>
            <button onClick={() => dispatch({ type: 'SIL', payload: todo.id })}>
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReducerExample;
