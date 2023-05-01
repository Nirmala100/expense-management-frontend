import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useState } from "react";
import Expenses from "./Expenses";
import ExpenseApi from "../../../../client-code/expenses";


export default function SingleCategoryExpenses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expenses, setExpenses] = useState([]);
  const categoryName = searchParams.get("category");

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = () => {
    new ExpenseApi().getExpensesByCategoryFilter(categoryName)
      .then(resJson => {
        setExpenses(resJson);
      });
  };

  return (
    <div className="container">
      <div className="collection-container">My {searchParams.get("category")} expenses:</div>
      <div className="row">
        <Expenses expenses={expenses} />
      </div>
    </div>

  );
}
