import React from 'react';
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom";
import Main from './components/Main.jsx';

const App = () => {
  return (
    <div>
      <Main/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
