import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Misssion from './components/Mission';
import History from './components/History';
import Company from './components/Company';
import Team from './components/Team';
import Members from './components/Members';
import MemberDetail from './components/MemberDetail';
import WrongPath from './components/WrongPath';
import './App.css';

// lazy loading for about us --> yoğun veri yükleme işlemleri için kullanılır
const LazyAboutUS = React.lazy(() => import('./components/AboutUs'));





function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
        path="/aboutUs" 
        element={
          <React.Suspense>
            <LazyAboutUS />
          </React.Suspense>
        }
        />
        <Route path="/mission" element={<Misssion />} />
        <Route path="/history" element={<History />}>
          <Route path="company" element={<Company />} />
          <Route path="team" element={<Team />} />
        </Route>
        <Route path="/members" element={<Members />} />
        <Route path="/members/:memberId" element={<MemberDetail />} />
        <Route path="*" element={<WrongPath />} />
      </Routes>
     
    </div>
  );
}

export default App;
