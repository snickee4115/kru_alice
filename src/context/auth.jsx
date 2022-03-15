import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [allOverHours, setAllOverHours] = useState();
    const [nameStudent, setNameStudent] = useState();
    const [stdid, setStdid] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        })
    }, [])
    
    return <AuthContext.Provider value={{ user, allOverHours, setAllOverHours, nameStudent, setNameStudent, stdid, setStdid }}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;