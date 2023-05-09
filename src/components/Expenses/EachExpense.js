import React from "react";
import M from "materialize-css";

import ExpenseUpdate from "./ExpenseUpdate";

export default class EachExpense extends React.Component {

    constructor(props) {
        super(props);

    }

    editClicked = () => {
        console.log("openhhhh")
        var modals = document.querySelectorAll(".modal");
        M.Modal.init(modals);
    }

    render() {
        return (<>
            <tr>
                <td>{(new Date(this.props.expense.date * 1000)).toLocaleString('default', { day: 'numeric', month: 'short' })}</td>
                <td>{this.props.expense.categoryName}</td>
                <td>{this.props.expense.name}</td>
                <td>{Math.round(this.props.expense.price * 100) / 100}</td>
                <td><a onClick={this.editClicked} className="modal-trigger" href="#update-expense-modal"><i className="material-icons">edit</i></a></td>
                <ExpenseUpdate expense={this.props.expense} />
            </tr>
        </>
        );
    }
}