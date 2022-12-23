import React from "react";
import M from "materialize-css";



class ExpenseAdd extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            category: "",
            price: "",
            date: Math.floor(new Date().getTime()/1000),
            error: "",
            categories: [],

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    //to initialize materialize css select
    componentDidMount() {
        const url = "http://localhost:8081/categories";
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
               // console.log(data);
                this.setState((state, props) => ({
                    categories: data,

                }), () => {
                    // Update select dom
                    var elems = document.querySelectorAll('select');
                    var instances = M.FormSelect.init(elems);
                    var elements = document.querySelectorAll('.datepicker');
                    var instance = M.Datepicker.init(elements, {
                        container: 'body',
                        onSelect: (selectedDate) => {
                            console.log("SelectedDate", selectedDate, selectedDate.getTime());
                            const epoch = Math.floor(selectedDate.getTime()/1000);
                            this.setState({ date: epoch });
                            
                            console.log(epoch);
                        },
                        autoClose: true
                    });
                });
                
            })
            .catch((error) => console.log(error));
    }



    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
       // console.log(target, target.name, target.value);
        this.setState({
            [target.name]: target.value,
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
      //  console.log(this.state.name);
       // console.log(this.state.date);


        try {
            let res = await fetch("http://localhost:8081/expenses", {
                method: "POST",
                body: JSON.stringify({
                    name: this.state.name,
                    categoryName: this.state.category,
                    price: this.state.price,
                    date: this.state.date,
                }),
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log("success");
                window.location.href = '/dashboard';

            } else {
                console.log(resJson.error);
                this.setState({
                    error: resJson.error,
                });
            }
        } catch (err) {
            console.log(err);
        }
     };

    render() {

        return (
            <div className="row">
                <form method="post" className="form" onSubmit={this.handleSubmit}>
                    <h1>Add Expense</h1>
                    <h1>{this.state.error}</h1>
                    <label htmlFor="name">&nbsp;Expense</label>
                    <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} autoComplete="on" required />
                    <br/>
                    <label htmlFor="categoryName">Select a Category:</label>
                    <br />
                    <div class="input-field col s12">
                        <select defaultValue="none" onChange={this.handleInputChange} name="category">
                            <option value="none" disabled>Choose your option</option>
                            {this.state.categories.map(option =>
                                <option value={option.name} key={option.name}>{option.name}</option>
                            )}
                        </select> 
                    </div>
                    <br/>
                    <label htmlFor="price">&nbsp;Price</label>
                    <input id="price" type="text" name="price" value={this.state.price} onChange={this.handleInputChange} autoComplete="on" required />
                    <br/>
                    <label htmlFor="date">&nbsp;Date</label>
                    <input
                        id="date" name="date"
                        type="text"
                        className="datepicker"
                        
                    />

                    <input id="submit-btn" type="submit" name="submit" value="ADD" />

                </form>
            </div>

        );
    }

}
export default ExpenseAdd;
