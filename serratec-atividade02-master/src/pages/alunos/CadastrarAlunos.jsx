import axios from "axios";
import { useEffect, useState } from "react";
import { ButtonCadastro, Form, InputCadastro } from "../../components/Cadastros";
import { API_URL } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router";
import { useContext } from "react";
import AlunoContext from "../../context/Aluno";


const CadastrarAlunos = () => {
  const { id } = useParams(); //Verifica se há um parâmetro.
  const MySwal = withReactContent(Swal);
  const { alunos, setAlunos } = useContext(AlunoContext);
  const valorInicial = id ? "" : null; //Impede que a label se sobreponha com os valores e popula quando há id.
  const [nome, setNome] = useState(valorInicial);
  const [idade, setIdade] = useState(valorInicial);
  const [cidade, setCidade] = useState(valorInicial);

  useEffect(() => {
      getAlunos();
  }, []);

  const getAlunos = () => {
    alunos.forEach((aluno) => {
        if (aluno.id == id) {
          setNome(aluno.nome);
          setIdade(aluno.idade);
          setCidade(aluno.cidade);
        }
      });
  };
  
  const recarregarAlunos = () => {
    axios.get(API_URL).then((response) => {
      setAlunos(response.data);
    });
  }

  const cadastrarAlunos = () => {
    if (id) {
    axios
      .put(API_URL, {
        id,
        nome,
        idade,
        cidade,
      })
      .then((response) => {
        if (response.status === 200) {
          recarregarAlunos();
          MySwal.fire(<p>{response?.data?.message}</p>);
          limparCampos();
        }
      }).catch(error => {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        })
      });
    } else {
    axios
      .post(API_URL, {
        nome,
        idade,
        cidade,
      })
      .then((response) => {
        if (response.status === 201) {
          recarregarAlunos();
          MySwal.fire(<p>{response?.data?.message}</p>);
          limparCampos();
        }
      }).catch(error => {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        })
      });
    }
  };

  const limparCampos = () => {
      setNome(" ");
      setIdade(" ");
      setCidade(" ");
  };

  return (
    <Form>
      <InputCadastro
        label="Nome"
        variant="outlined"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <InputCadastro
        label="Idade"
        variant="outlined"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <InputCadastro
        label="Cidade"
        variant="outlined"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />

      <ButtonCadastro variant="contained" onClick={cadastrarAlunos}>
        {id ? 'Editar' : 'Cadastrar'}
      </ButtonCadastro>
    </Form>
  );
};

export default CadastrarAlunos;