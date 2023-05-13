import React from "react";
import PieChart from "./PieChart";
import BarGraph from "./BarGraph";
import ExpenseApi from "../../../../client-code/expenses";
import Expenses from "./Expenses";
import './Dashboard.css';
import { Link } from "react-router-dom";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date(new Date().toLocaleString('en', { timeZone: 'Africa/Timbuktu' }));
    const lastOfMonth = this.lastDayOfMonth(today);
    const firstOfMonth = this.firstDayOfMonth(today);
    this.state = {
      expenses: [],
      barChartData: undefined,
      pieChartData: undefined,
      fromDate: firstOfMonth,
      toDate: lastOfMonth,
    };
    // This binding is necessary to make `this` work in the callback
    this.triggerSearch = this.triggerSearch.bind(this);
  }

  lastDayOfMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0);
  }

  firstDayOfMonth(date) {
    var copiedDate = new Date(date.getTime());
    copiedDate.setDate(1);
    return copiedDate;
  }

  toMilliseconds(date) {
    return Math.floor(date.getTime() / 1000);
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData = () => {
    this.triggerSearch(this.state.fromDate, this.state.toDate);
  }

  prevMonth = () => {
    this.updateMonthRange(-1);
  }

  nextMonth = () => {
    const today = new Date();
    if (this.state.fromDate.getTime() <= today.getTime()) {
      this.updateMonthRange(1);
    }
  }

  updateMonthRange(toAddMonth) {
    this.setState((state, props) => {
      const temp = this.addMonth(state.fromDate, toAddMonth);
      const fromDate = this.firstDayOfMonth(temp);
      const toDate = this.lastDayOfMonth(fromDate);
      return {
        fromDate: fromDate,
        toDate: toDate,
      }
    }, () => this.triggerSearch(this.state.fromDate, this.state.toDate));
  }

  addMonth = (date, toAddMonth) => {
    return new Date(date.setMonth(date.getMonth() + toAddMonth));
  }

  triggerSearch(fromDate, toDate) {
    // set the state
    const fromDateMs = this.toMilliseconds(fromDate);
    const toDateMs = this.toMilliseconds(toDate);
    new ExpenseApi().getExpensesByDateFilter(fromDateMs, toDateMs)
      .then(resJson => {
        return {
          barData: this.processBarChartData(resJson),
          pieData: this.processPieChartData(resJson),
          rawExpenses: resJson,
        }
      }).then(processed => {
        this.setState({
          pieChartData: processed.pieData,
          barChartData: processed.barData,
          expenses: processed.rawExpenses,
        });
      })
  }

  processBarChartData(expenses) {
    const monthStr = this.state.fromDate.toLocaleString('default', { month: 'short' });
    var categories = expenses.reduce((set, obj) => {
      set.add(obj["categoryName"]);
      return set;
    }, new Set());
    categories = [...categories];

    var byDays = expenses.reduce((map, obj) => {
      // const key = (new Date(obj["date"] * 1000)).getDate();
      const key = (new Date(obj["date"] * 1000)).getUTCDate();
      if (!(key in map)) {
        map[key] = Array(categories.length).fill(0.0);
      }
      const idx = categories.indexOf(obj["categoryName"]);
      map[key][idx] += obj["price"];
      return map;
    }, {});

    //if byDays has no values then display "No data for this period"
    if (Object.keys(byDays).length === 0) {
      return undefined;
    }

    for (var i = this.state.fromDate.getUTCDate(); i <= this.state.toDate.getUTCDate(); i++) {
      if (!(i in byDays)) {
        byDays[i] = Array(categories.length).fill(0.0);
      }
    }
    // console.log("ByDays", byDays);
    var dataa = [];
    dataa.push(["Day", ...categories]);
    const p = Object.keys(byDays).map(key => [`${monthStr} ${key}`, ...byDays[key]]);
    dataa.push(...p);
    return dataa;
  }

  processPieChartData(expenses) {
    const dataByCategory = expenses.reduce(function (map, obj) {
      if (obj["categoryName"] in map) {
        map[obj["categoryName"]] += obj["price"];

      } else {
        //initially create a obj with price
        map[obj["categoryName"]] = obj["price"];
      }
      return map;
    }, {});

    const dd = Object.keys(dataByCategory).map(key => [key, dataByCategory[key]]);
    if (Object.keys(dd).length === 0) {
      return undefined;
    }
    dd.unshift(["Category", "Total"]);
    return dd;
  }

  render() {
    const dateOption = { year: 'numeric', month: 'long' };
    const currentDateStr = this.state.fromDate.toLocaleDateString("en-US", dateOption);
    let dashboardElements = [];

    if (!this.state.barChartData || !this.state.pieChartData) {
      // Case when there is no data. Don't display data
      dashboardElements.push(
        <div className="row dashboard-row" key="no-data">
          <div className="col s12">
            <div style={{ padding: "20px" }}>
              No data available for the period
            </div>
          </div>
        </div>
      );
    } else {
      // Push each dashboard component for rendering when data is present
      dashboardElements.push(
        <div className="row dashboard-row" key="sum-by-category">
          <div className="col s6">
            <PieChart data={this.state.pieChartData} />
          </div>
          <div className="col s6">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pieChartData && [...this.state.pieChartData].splice(1).map(pie =>
                  <tr key={pie[0]}>
                    <td><Link to={`/dashboard/expenses?category=${pie[0]}`} key="blah">{pie[0]}</Link></td>
                    <td>{Math.round(pie[1] * 100) / 100}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
      dashboardElements.push(
        <div className="row dashboard-row" key="bar-chart">
          <div className="col s12">
            <BarGraph data={this.state.barChartData} />
          </div>
        </div>
      );
      dashboardElements.push(
        <div className="row dashboard-row" key="expense-list">
          <Expenses expenses={this.state.expenses} onReload={this.reloadData} />
        </div>
      );
    }

    return (
      <div className="container">
        <div className="nav-container">
          <div className="navigation">
            <i className="small material-icons" onClick={this.prevMonth}>chevron_left</i>
            <div><strong>Expenses from {currentDateStr}</strong></div>
            <i className="small material-icons" onClick={this.nextMonth}>chevron_right</i>
          </div>
        </div>
        {dashboardElements.map(ele => ele)}
      </div>
    );
  }
}