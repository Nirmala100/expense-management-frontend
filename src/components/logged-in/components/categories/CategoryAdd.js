import React from "react";
import { useNavigate } from "react-router-dom";

class CategoryAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            name : "",
            error : "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        console.log(target.name);
        console.log(target.value);
        this.setState({
          [target.name]: target.value,
        });
      }

    handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
          let res = await fetch("http://localhost:8081/categories", {
            method: "POST",
            body: JSON.stringify({
              name: this.state.name,
            }),
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });
          let resJson = await res.json();
          if (res.status === 200) {
            console.log("success");
            window.location.href = '/loggedIn/categories';
           
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
                <h1>Add Category</h1>
                <h1>{this.state.error}</h1>
                <label htmlFor="name">&nbsp;Category</label>
                <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} autoComplete="on" required />
                
                <input id="submit-btn" type="submit" name="submit" value="ADD" />
                
              </form>
            </div>
          
        );
      } 
    

}
export default CategoryAdd;
