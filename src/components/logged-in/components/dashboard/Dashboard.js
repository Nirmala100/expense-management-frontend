import React from "react";
import PieChart from "./PieChart";
import Expenses from "./Expenses";
import BarGraph from "./BarGraph";
import Search from "./Search";
import ExpenseApi from "../../../../client-code/expenses";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      fromDate: undefined,
      toDate: undefined,
    };
     // This binding is necessary to make `this` work in the callback
    this.triggerSearch = this.triggerSearch.bind(this);
  }

  triggerSearch(fromDate, toDate) {
    // set the state
    console.log("Starting search", fromDate, toDate);
    new ExpenseApi().getExpensesByFilter(fromDate, toDate)
    .then(resJson => {
      this.setState({
        expenses: resJson
      })
    });
  }

  render() {
    return (

      <div>
        <Search onSearch={this.triggerSearch} />
        <div>
          <Expenses expenses={this.state.expenses}/>
        </div>
        <div className="col s6">
          <PieChart  expenses={this.state.expenses}/>
        </div>
        <div className="col s6">
          <BarGraph expensesByMonth={this.state.expenses}/>
        </div>



      </div>

    );
  }
}