import React from "react";
import M from "materialize-css";
import CategoryApi from "../../client-code/categories";
import ExpenseApi from "../../client-code/expenses";
import { useNavigate } from "react-router-dom";



class ExpenseUpdate extends React.Component {

  constructor(props) {
    super(props);
    //set initial state to value passed by props
    this.state = {
      name: props.expense.name,
      category: props.expense.categoryName,
      price: props.expense.price,
      date: Math.floor(new Date().getTime() / 1000),
      error: "",
      categories: [],

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.categoriesApi = new CategoryApi();
    this.expensesApi = new ExpenseApi();
  }




  //to initialize materialize css select
  componentDidMount() {
    this.categoriesApi.getCategories()
      .then((data) => {
        //console.log(data);
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
              const epoch = Math.floor(selectedDate.getTime() / 1000);
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
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit = async (e) => {
    // const navigate = useNavigate();
    e.preventDefault();
    this.expensesApi.updateExpense({
      id: this.props.expense.id,
      name: this.state.name,
      categoryName: this.state.category,
      price: this.state.price,
      date: this.state.date,
    }, this.props.expense.id)
      .then(resJson => {
        if (resJson.error) {
          console.log(resJson.error);
          this.setState({
            error: resJson.error,
          });
        } else {

          // navigate(-1);
          window.location.href = '/expenses/dashboard';
        }
      })
  };

  render() {

    return (

      <div id="update-expense-modal" className="modal">
        <div className="modal-content">
          <form method="post" className="form" onSubmit={this.handleSubmit}>
            <h3>Update Expense</h3>
            <h1>{this.state.error}</h1>

            <div className="input-field col s12">
              <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} autoComplete="on" required />
              <label htmlFor="name" className="autocomplete" >Expense</label>
            </div>
            <br />

            <div className="input-field col s12">
              <select defaultValue="none" onChange={this.handleInputChange} name="category" id="category">
                <option value="none" disabled>{this.state.category}</option>
                {this.state.categories.map(option =>
                  <option value={option.name} key={option.name}>{option.name}</option>
                )}
              </select>
              <label htmlFor="categoryName">Select a Category:</label>
            </div>
            <br />

            <div className="input-field col s12" >
              <input id="price" type="text" name="price" value={this.state.price} onChange={this.handleInputChange} autoComplete="on" required />
              <label htmlFor="price">Price</label>
            </div>
            <br />

            <div className="input-field col s12" >
              <input
                id="date" name="date"
                type="text"
                className="datepicker"

              />
              <label htmlFor="date">Date</label>
            </div>
            <br />

            <input id="submit-btn" type="submit" name="submit" value="UPDATE" />

          </form>
        </div>
      </div>

    );
  }

}
export default ExpenseUpdate;
