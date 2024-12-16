// src/components/Produto.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    fetchProdutos();
    fetchFornecedores();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fornecedores');
      setFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`http://localhost:3001/produto/${editando}`, { nome, preco, fornecedor: fornecedorId });
        setEditando(null);
      } else {
        await axios.post('http://localhost:3001/produto', { nome, preco, fornecedor: fornecedorId });
      }
      setNome('');
      setPreco('');
      setFornecedorId('');
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (produto) => {
    setEditando(produto._id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setFornecedorId(produto.fornecedor._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/produto/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Cadastro de Produto
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                fullWidth
                variant="outlined"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Preço"
                fullWidth
                variant="outlined"
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="fornecedor-label">Fornecedor</InputLabel>
              <Select
                labelId="fornecedor-label"
                fullWidth
                value={fornecedorId}
                onChange={(e) => setFornecedorId(e.target.value)}
                required
              >
                {fornecedores.map((fornecedor) => (
                  <MenuItem key={fornecedor._id} value={fornecedor._id}>
                    {fornecedor.nome}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {editando ? 'Salvar' : 'Cadastrar'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Lista de Produtos
        </Typography>
        <ul>
          {produtos.map((produto) => (
            <li key={produto._id}>
              {produto.nome} - ${produto.preco} - Fornecedor: {produto.fornecedor.nome}
              <Button onClick={() => handleEdit(produto)}>Editar</Button>
              <Button onClick={() => handleDelete(produto._id)}>Excluir</Button>
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
}

export default Produto;
