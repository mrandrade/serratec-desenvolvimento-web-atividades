import { createContext, useState } from "react";

//Criando o estado inicial...
const estadoInicial = {
    temaSelecionado: "claro",
    setTemaSelecionado: () => {}
};

// Criando o contexto...
const TemaContext = createContext(estadoInicial);

//Criando o provider...
const TemaProvider = ({children}) => {
  const [temaSelecionado, setTemaSelecionado] = useState(
    estadoInicial.temaSelecionado
  );

  return (
    <TemaContext.Provider
      value={{
        temaSelecionado,
        setTemaSelecionado,
      }}
    >
      {children}
    </TemaContext.Provider>
  );
};
//Exportando....
export { TemaProvider };
export default TemaContext;