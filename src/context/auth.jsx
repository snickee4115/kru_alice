import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    // const [allOverHours, setAllOverHours] = useState();
    // const [allCourse, setAllCourse] = useState([]);
    const [nameStudent, setNameStudent] = useState();
    const [stdid, setStdid] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })
    }, [])

    if (loading) {
        return null
    }
    
    return <AuthContext.Provider value={{ user, nameStudent, setNameStudent, stdid, setStdid }}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;