import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Flight from './components/Flight.jsx';
import Hotel from './components/Hotel.jsx'; 
import Main from './components/Main.jsx';

const App = () => {
  return (
    <div>
      <Main/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
