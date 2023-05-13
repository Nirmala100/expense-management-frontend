import React from "react";

import ExpenseApi from "../../client-code/expenses";

export default class EachExpense extends React.Component {

    constructor(props) {
        super(props);
    }


    editClicked = () => {
        this.props.onEditClicked(this.props.expense);
    }

    render() {
        return (<>
            <tr>
                <td>{(new Date(this.props.expense.date * 1000)).toLocaleString('default', { day: 'numeric', month: 'short' })}</td>
                <td>{this.props.expense.categoryName}</td>
                <td>{this.props.expense.name}</td>
                <td>{Math.round(this.props.expense.price * 100) / 100}</td>
                <td><a onClick={this.editClicked}><i className="material-icons">edit</i></a></td>
            </tr>
        </>
        );
    }
}