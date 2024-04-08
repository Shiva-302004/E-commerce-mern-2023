import { useState, useEffect } from "react";
export default function useCategory() {
    const [categories, setcategories] = useState([])
    const getCategories = () => {
        fetch("http://localhost:8000/all-category").then(res => res.json()).then((data) => setcategories(data.data))
    }
    useEffect(()=>{
        getCategories()
    },[])
    return categories;
}