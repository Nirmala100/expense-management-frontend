import React from "react";
import M from "materialize-css";
import Expenses from "./Expenses";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: undefined,
            toDate: undefined,
        };
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.onSearch(this.state.fromDate, this.state.toDate); //props passed from dashboard
    };

    componentDidMount() {
        var elements = document.querySelectorAll('.datepicker-fromDate');
        var instance = M.Datepicker.init(elements, {
            container: 'body',
            showClearBtn: true,
            onSelect: (selectedDate) => {
                console.log("SelectedDate", selectedDate, selectedDate.getTime());
                const epoch = Math.floor(selectedDate.getTime() / 1000);
                this.setState({ fromDate: epoch });

                console.log(epoch);
            },
            autoClose: true
        });

        var elems = document.querySelectorAll('.datepicker-toDate');
        var instances = M.Datepicker.init(elems, {
            container: 'body',
            showClearBtn: true,
            onSelect: (selectedDate) => {
                console.log("SelectedDate", selectedDate, selectedDate.getTime());
                const epoch = Math.floor(selectedDate.getTime() / 1000);
                this.setState({ toDate: epoch });

                console.log(epoch);
            },
            autoClose: true
        });
    }

    render() {
        return (
            <div>
                <form method="post" className="form" onSubmit={this.handleSubmit}>
                    <div>
                        <div className="col s4">
                            <input
                                id="date" name="fromDate"
                                placeholder="From Date"
                                type="text"
                                className="datepicker-fromDate"

                            />
                        </div>
                        <div className="col s4">
                            <input
                                id="date" name="toDate"
                                placeholder="To Date"
                                type="text"
                                className="datepicker-toDate"

                            />
                        </div>
                        <div className="col s4">
                            <input id="submit-btn" type="submit" name="submit" value="Search" />
                        </div>

                    </div>
                </form>
            </div>
        )
    }

}