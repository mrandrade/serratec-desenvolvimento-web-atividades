import { useContext } from "react";
import TemaContext from "../context/Tema";
import tema from "../tema"

const DefaultPage = (props) => {
  const { temaSelecionado } = useContext(TemaContext);
  return (
    <div style={tema[temaSelecionado]}>
      {props.children}
    </div>
  );
};

export default DefaultPage;