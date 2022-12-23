import React from "react";
import featImg from "../../assets/img-main.jpg";
import { redirect, useNavigate } from "react-router-dom";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {}
        };

        // This binding is necessary to make `this` work in the callback
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.validate()) {
            console.log(this.state);
            // let input ={};
            //  input["name"] = "";
            //  input["email"] = "";
            //   input["password"] = "";
            //   input["confirm_password"] = "";
            alert("Form is being submitted");

            try {
                let res = await fetch("http://localhost:8081/user", {
                    method: "POST",
                    body: JSON.stringify({
                        email: this.state.input.email,
                        name: this.state.input.name,
                        password: this.state.input.password,
                    }),
                });
                //console.log(res);
                let resJson = await res.json();
                if (res.status === 200) {

                    console.log("successfuly registered");
                    // return redirect("/loggedIn");

                    this.props.onSignupSuccess();
                } else {
                    console.log(resJson.error);
                    let errors = {};
                    errors["email"] = resJson.error;
                    this.setState({
                        
                        errors : errors,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please ener your name.";
        }

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please ener your email address.";
        }

        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["password"] != input["confirm_password"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <div className="wrapper">
                <div className="card-container z-depth-4">
                    <div className="row">
                        <div className="col s6 image">
                            <img className="img-feat" src={featImg} />
                        </div>
                        <div className="col s6">
                            <form method="post" className="form" onSubmit={this.handleSubmit}>
                                <h1>Sign up</h1>
                                <h1>{this.state.errors.email}</h1>
                                
                                <label htmlFor="user-name">&nbsp;Name</label>
                                <input
                                    id="user-name"
                                    type="text"
                                    name="name"
                                    value={this.state.input.name}
                                    onChange={this.handleInputChange}
                                    autoComplete="on"
                                />

                                <div className="text-danger">{this.state.errors.name}</div>
                                <label htmlFor="user-email">&nbsp;Email</label>
                                <input
                                    id="user-email"
                                    type="email"
                                    name="email"
                                    value={this.state.input.email}
                                    onChange={this.handleInputChange}
                                    autoComplete="on"
                                    required />

                                <div className="text-danger">{this.state.errors.email}</div>
                                <label htmlFor="user-password">&nbsp;Password</label>
                                <input
                                    id="user-password"
                                    className="form-content"
                                    value={this.state.input.password}
                                    onChange={this.handleInputChange}
                                    type="password"
                                    name="password"
                                    required />

                                <div className="text-danger">{this.state.errors.password}</div>
                                <label htmlFor="user-password">&nbsp;Confirm Password</label>
                                <input
                                    id="confirm-password"
                                    className="form-content"
                                    value={this.state.input.confirm_password}
                                    onChange={this.handleInputChange}
                                    type="password"
                                    name="confirm_password"
                                    required />

                                <div className="text-danger">{this.state.errors.confirm_password}</div>
                                <input id="submit-btn" type="submit" name="submit" value="REGISTER" />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
