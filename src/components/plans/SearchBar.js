import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import { auth } from '../../firebase.config';
import budgetServices from "./budget.services";
import { currencyFormatter } from "../hometest/utils";

const SearchBar = () => {

    const [value, setValue] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [showResults, setShowResults] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        getBudget();
      }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setShowResults(false);
        }
    };

    
    const getBudget = async (e) => {
        if (e) {
            e.preventDefault();
        }
        if (searchName.trim() !== "") {
            console.log("searchName: ", searchName);
            const userId = auth.currentUser.uid; // get the current user's ID
            const data = await budgetServices.getAllBudgets();
            console.log("data.docs: ", data.docs);
            setValue(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((budget) => budget.userId === userId) // filter budgets based on userId
            .filter((budget) => budget.name.toLowerCase().startsWith(searchName.toLowerCase())));
            setShowResults(true);   
        }

    };
   /* const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            getBudget();
        }
    };*/

    return (
        <div className="searchWrapper">
            <h3>Search Budgets</h3>
            <form onSubmit={getBudget}>
                <div className="searchBarDiv" ref={wrapperRef}>
                    <input type="text" 
                    onChange={(event) => setSearchName(event.target.value)}
                    value = {searchName} 
                    placeholder="search..."/>
                    <button type="Submit">
                        Search
                    </button>
                </div>
            </form>
            {showResults && (
            <ul className="searchBack">
                {value.map((result) => (
                    <div className="searchEntry" key={result.id}>
                    <li>
                        <span className="name">{result.name}</span>
                    </li>
                    <li>
                        <span className="amount">{currencyFormatter.format(result.amount)}</span>
                    </li>
                    <li>
                        <span className="date">{result.date}</span>
                    </li>
                    </div>
            ))}
        </ul>
            )}


      </div>
    );
}; export default SearchBar;