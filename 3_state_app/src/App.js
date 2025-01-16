
import './App.css';
import { useState } from 'react';

function App() {

  const [value, setValue] = useState(0);
  // parantez icindeki 0 --> value için ilk deger
  // setValue --> value degerini degistirmek icin kullanilir
  // istenen iş için arrow function kullanilir, içerisinde setValue kullanilir

  const handleClick = () => {
    setValue(value + 1);
  };

  return (
    <div className="App">
      <button onClick={handleClick}> Add Course</button>
      <div>Number of Courses: {value}</div>
    </div>
  );
}

export default App;
