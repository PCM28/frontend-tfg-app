import React from 'react';
import NavbarHomepage from './components/NavbarHomepage';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import UploadPage from './pages/UploadPage/UploadPage';
import NotFound from './pages/NotFound/NotFound';
import './App.scss';

const App: React.FC = () => {
    return (
      <div className="App">
        <header>
          <NavbarHomepage />
        </header>

        <body>
          <Routes>
            <Route path="/" element = { <HomePage /> }></Route>
            <Route path="/posts" element = { <UploadPage /> }></Route>
            <Route path="*" element = { <NotFound /> }></Route>
          </Routes>
        </body>
        <footer>
          <p>@All Rights Reserved 2024</p>
        </footer>
        
      </div>
    );
}

export default App;
