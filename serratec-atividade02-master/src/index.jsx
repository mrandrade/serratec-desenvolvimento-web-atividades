import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, useRoutes } from "react-router-dom";
import AlunosListagem from './pages/alunos/AlunosListagem';
import MateriasListagem from './pages/materias/MateriasListagem';
import Navbar from './components/Navbar/Navbar';
import Container from '@mui/material/Container';
import CadastrarAlunos from "./pages/alunos/CadastrarAlunos";
import CadastrarMaterias from './pages/materias/CadastrarMaterias';
import DefaultPage from './components/DefaultPage';
//import { AlunoProvider } from './context/Aluno';
//import { TemaProvider } from './context/Tema';
import GlobalContext from './context';

const Routes = () => {
  const routes = useRoutes([
    { path: "/", element: <AlunosListagem /> },
    { path: "/materias-listagem", element: <MateriasListagem /> },
    { path: "/cadastrar-alunos", element: <CadastrarAlunos /> },
    { path: "/editar-alunos/:id" , element: <CadastrarAlunos />},
    { path: "/cadastrar-materias", element: <CadastrarMaterias /> },
  ]);

  return routes;
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalContext>
    <DefaultPage>
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="md">
        <Routes />
      </Container>
    </BrowserRouter>
    </DefaultPage>
    </GlobalContext>
  </React.StrictMode>,
  document.getElementById('root')
);