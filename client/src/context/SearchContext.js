import { useState,useContext,createContext } from "react";
const SearchContext=createContext()

const SearchProvider=({children})=>{
    const [value,setvalue]=useState({
        keyword:"",
        result:[]
    })
    return(
    <SearchContext.Provider value={{value,setvalue}}>
        {children}
    </SearchContext.Provider>
    )
}
const useSearch=()=>useContext(SearchContext)
export  {useSearch,SearchProvider}