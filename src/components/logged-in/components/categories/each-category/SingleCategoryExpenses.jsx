import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoginApi from "../../../../../client-code/login";


import './EachCategory.css';
import { useState } from "react";


export default function SingleCategoryExpenses() {
 const [searchParams, setSearchParams] = useSearchParams();
 console.log("Search params category", searchParams.get("category"));
 const url = "http://localhost:8081/expenses?category="+searchParams.get("category")

 const [expenses , setExpenses] = useState([]);

 useEffect (() => {
    fetchExpenses()
 },[])

 const fetchExpenses = async () => {
  try {
    const config = {headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }}
    const response = await fetch(url,config);
    const data = await response.json();
    setExpenses(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};


  
  return (
      <div className="container">
        <div className="collection-container">My {searchParams.get("category")} expenses:</div>
        
        <ul className="collection-container"> 
         {/* if expenses exist then list them otherwise display No expenses for this category */}
         {expenses != undefined || expenses.length > 0 ? expenses.map((expense)=> {
          return (
            <table className="highlight centered responsive-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
              <tr key={expense.id}>
                <td>{(new Date(expense.date * 1000)).toLocaleString('default', { day: 'numeric', month: 'short' })}</td>
                <td>{expense.name}</td>
                <td>${Math.round(expense.price * 100) / 100}</td>
              </tr>
          </tbody>
        </table>
          )}) : <h3>No expenses at the moment!</h3>
         }
         
        </ul>
      
      </div>
    
  );
  }
 