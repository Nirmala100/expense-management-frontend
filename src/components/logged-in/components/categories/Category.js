import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Category() {
    const { catName } = useParams();
    const [ expenses, setExpenses ] = useState([]);
    console.log("CategoryName", catName);
    console.log("Expenses", expenses);

    useEffect(() => {        
        const url = "http://localhost:8081/expenses?" + new URLSearchParams({
            category: catName
        });
        console.log("Fetching content from URL", url);
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(resp => resp.json())
            .then(data => {
                console.log("Data fetched ", data);
                setExpenses(data);
            })
        }, [catName]);

    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}> {expense.name}</li>
            ))}
        </ul>
    )
}

