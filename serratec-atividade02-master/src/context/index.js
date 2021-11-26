import { AlunoProvider } from "./Aluno";
import { TemaProvider } from "./Tema";



const GlobalContext = ({ children }) => {
    return (
        <TemaProvider>
            <AlunoProvider>{children}</AlunoProvider>
        </TemaProvider>
    );
};

export default GlobalContext;