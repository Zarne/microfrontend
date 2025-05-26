import './App.css';
import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { Equipes }  from './components/equipes/equipes';
import { Operations }  from './components/equipes/operations';


const App = () => {
  return (
    <BrowserRouter>
      <div className="app">

        <main>
          <div className="content">
            <h1>Rsbuild with React</h1>
            <p>Start building amazing things with Rsbuild.</p>
            <a href='/equipes' className='btn btn-primary'>equipes</a>
            
            
            <Equipes />
            <Operations />
          </div>

        </main>

      </div>

    </BrowserRouter>
  );
};

export default App;
