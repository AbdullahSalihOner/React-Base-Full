import React from 'react';
import './App.css';
import CourseFrom from './components/CourseFrom';
import CourseSearch from './components/CourseSearch';
import CourseList from './components/CourseList';
import CourseValue from './components/CourseValue';

function App() {
  return (
    <div className="container is-fluid">
      <CourseFrom />
      <CourseSearch />
      <CourseList />
      <CourseValue />   
    </div>
  );
}

export default App;
