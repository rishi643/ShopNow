import { createContext, useState } from "react";

export const LoginContext = createContext();

export default function LoginContextProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    return (
        <LoginContext.Provider value={{ token, setToken }}>
            {children}
        </LoginContext.Provider>
    );
};

