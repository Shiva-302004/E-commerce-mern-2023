import { useState,useEffect,useContext,createContext } from "react";
const AuthContext=createContext()

const AuthProvider=({children})=>{
    const [auth,setauth]=useState({
        user:null,
        token:""
    })
    return(
    <AuthContext.Provider value={{auth,setauth}}>
        {children}
    </AuthContext.Provider>
    )
}
const useAuth=()=>useContext(AuthContext)
export  {useAuth,AuthProvider}