import "./Login.css";
import featImg from "../../assets/img-main.jpg";
import React from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../client-code/constant";
import LoginApi from "../../client-code/login";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginApi = new LoginApi();
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await this.loginApi.login(this.state.email, this.state.password);
      this.props.onLoginSuccess(res.token);
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="card-container z-depth-4">
          <div className="col image">
            <div className="image-container">
              <div><i className="large material-icons">account_balance_wallet</i></div>
              <div>
                <i className="tiny material-icons">add_alert</i>
                Track your money
              </div>
            </div>
          </div>
          <div className="col">
            <form method="post" className="form" onSubmit={this.handleSubmit}>
              <h1>Sign in</h1>
              <h1>{this.state.error}</h1>
              <label htmlFor="user-email">&nbsp;Email</label>
              <input id="user-email" type="email" name="email" value={this.state.email} onChange={this.handleInputChange} autoComplete="on" required />
              <label htmlFor="user-password">&nbsp;Password</label>
              <input id="user-password" className="form-content" value={this.state.password} onChange={this.handleInputChange} type="password" name="password" required />
              <a href="#">Forgot password?</a>
              <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
              <Link to="/register"> Don't have account yet? </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
