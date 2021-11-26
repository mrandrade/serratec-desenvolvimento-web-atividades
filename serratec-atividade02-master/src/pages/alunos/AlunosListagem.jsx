import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "../../components/styles";
import { useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../lotties/loading-circle.json'
import AlunoContext from "../../context/Aluno";

const AlunosListagem = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  

  const { alunos, setAlunos } = useContext(AlunoContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRation: "xMidYMid slice"
    }
  };

  useEffect(() => {
    if (alunos.length <= 0) {
      getAlunos();
    }
  },[]);

  const getAlunos = () => {
    axios.get(API_URL).then((response) => {
      setTimeout(() => {
        setAlunos(response.data);
      }, 1000)
    });
  };

  const recarregarAlunos = () => {
    axios.get(API_URL).then((response) => {
      setAlunos(response.data);
    });
  }

  const deletarAluno = (aluno) => {
    axios
      .delete(API_URL, { data: aluno })
      .then((response) => {
        MySwal.fire(<p>{response?.data?.message}</p>);
        recarregarAlunos();
        const alunoIndex = alunos.findIndex(
          (elemento) => elemento.id === aluno.id
        );
        let newAlunos = [ ...aluno ];
        newAlunos.splice(alunoIndex, 1);
        setAlunos(newAlunos);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops..."
        });
      });
  };

  const editarAluno = (aluno) => {
    navigate(`/editar-alunos/${aluno.id}`);
  }

  return (
    <Box sx={{ marginTop: "25px" }}>
      {alunos.length > 0 ? (
<TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Idade</StyledTableCell>
              <StyledTableCell>Cidade</StyledTableCell>
              <StyledTableCell>Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos.map((alunoAtual) => (
              <StyledTableRow>
                <StyledTableCell>{alunoAtual.nome}</StyledTableCell>
                <StyledTableCell>{alunoAtual.idade}</StyledTableCell>
                <StyledTableCell>{alunoAtual.cidade}</StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => editarAluno(alunoAtual)} variant="text">
                    <EditIcon />
                  </Button>
                  <Button onClick={() => deletarAluno(alunoAtual)} variant="text">
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        ) : (
            <>
            <Lottie options={defaultOptions} height={500} width={500}/>
            </>
        )
      }
    </Box>
  );
};

export default AlunosListagem;