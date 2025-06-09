import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios"; // Importa o Axios

interface CreateAccountProviderProps{
    children: ReactNode;
}

interface CreateAccountData{
    name: string;
    email: string;
    password: string;
    role: string
}

interface CreateAccountContextData {
    createAccountError: boolean;
    createAccountSuccess: boolean;
    createAccountData: ({email,name,password,role}:CreateAccountData) => void;
}

const CreateAccountContext = createContext({} as CreateAccountContextData);

const CreateAccountProvider = ({children}:CreateAccountProviderProps) => {
    const [createAccountError, setCreateAccountError] = useState<boolean>(false);
    const [createAccountSuccess, setCreateAccountSuccess] = useState<boolean>(false);

    async function createAccountData({email,name,password,role}:CreateAccountData){
        const userData = {
            email,
            name,
            password,
            role
        }

        try {
            const response = await axios.post("/api/users/register", userData);

            if(response.status === 201){
                setCreateAccountSuccess(true);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setCreateAccountError(true);
                setCreateAccountSuccess(false)
                console.log("Erro: ", error.response.data.message); // Mensagem de erro vinda do backend
              } else {
                setCreateAccountError(true);
                setCreateAccountSuccess(false)
                console.error("Erro ao criar usuário: ", error.message);
              }
        }
        
    }

    
    return(
        <CreateAccountContext.Provider value={{createAccountError,createAccountSuccess, createAccountData}}>
            {children}
        </CreateAccountContext.Provider>
    );
}

function useCreateUser(){
    const context = useContext(CreateAccountContext);
    return context
}

export { CreateAccountProvider, useCreateUser};