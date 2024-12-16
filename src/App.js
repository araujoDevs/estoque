import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fornecedor from './components/Fornecedor';
import Produto from './components/Produto';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Sistema de Estoque</h1>
          <nav>
            <a href="/fornecedor">Cadastro de Fornecedor</a>
            <a href="/produto">Cadastro de Produto</a>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/fornecedor" element={<Fornecedor />} />
            <Route path="/produto" element={<Produto />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
