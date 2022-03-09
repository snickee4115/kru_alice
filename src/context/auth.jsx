import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [moreHours, setMoreHours] = useState();
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        })
    }, [])
    
    return <AuthContext.Provider value={{ user, moreHours, setMoreHours }}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;