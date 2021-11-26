import { useState, createContext } from "react";

//Criando o estado inicial...
const estadoInicial = {
    alunos: [],
    setAlunos: () => {},
};

// Criando o contexto...
const AlunoContext = createContext(estadoInicial);

//Criando o provider...
const AlunoProvider = ({ children }) => {
    const [alunos, setAlunos] = useState(
        estadoInicial.alunos
    );
    return (
        <AlunoContext.Provider
            value={{
                alunos,
                setAlunos,
            }}
        >
            {children}
        </AlunoContext.Provider>
    );
};
//Exportando....
export { AlunoProvider };
export default AlunoContext;