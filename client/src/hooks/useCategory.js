import { useState, useEffect } from "react";
export default function useCategory() {
    const [categories, setcategories] = useState([])
    const getCategories = () => {
        fetch("https://e-commerce-mern-2023.onrender.com/all-category").then(res => res.json()).then((data) => setcategories(data.data))
    }
    useEffect(()=>{
        getCategories()
    },[])
    return categories;
}