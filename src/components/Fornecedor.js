// src/components/Fornecedor.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Fornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    fetchFornecedores();
  }, []);

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
        await axios.put(`http://localhost:3001/fornecedor/${editando}`, { nome, cnpj });
        setEditando(null);
      } else {
        await axios.post('http://localhost:3001/fornecedor', { nome, cnpj });
      }
      setNome('');
      setCnpj('');
      fetchFornecedores();
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
    }
  };

  const handleEdit = (fornecedor) => {
    setEditando(fornecedor._id);
    setNome(fornecedor.nome);
    setCnpj(fornecedor.cnpj);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/fornecedor/${id}`);
      fetchFornecedores();
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Cadastro de Fornecedor
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
                label="CNPJ"
                fullWidth
                variant="outlined"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                required
              />
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
          Lista de Fornecedores
        </Typography>
        <ul>
          {fornecedores.map((fornecedor) => (
            <li key={fornecedor._id}>
              {fornecedor.nome} ({fornecedor.cnpj})
              <Button onClick={() => handleEdit(fornecedor)}>Editar</Button>
              <Button onClick={() => handleDelete(fornecedor._id)}>Excluir</Button>
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
}

export default Fornecedor;
