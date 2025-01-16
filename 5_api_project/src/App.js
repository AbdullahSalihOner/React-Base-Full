import React from 'react';
import './App.css';
import SearchHeader from './component/SearchHeader';
import searchImages from './api/api';
import { useState } from 'react';
import ImageList from './component/ImageList';


function App() {
  // bir yereden cevap bekliyorsak async wait kullaniyoruz
  const [images, setImages] = useState([]);

  // handleSubmit --> form submit edildiginde calisacak
  const handleSubmit = async (term) => {
 
    const result = await searchImages(term);

    setImages(result);

  };

  return (
    <div className="App">
      <SearchHeader search={handleSubmit} />
      <ImageList imagesPlaceholder={images} />
    </div>
  );
}

export default App;


