
import React from "react";
import profile from "../../../../assets/profile-image.jpeg"
import "./ProfileSettingsHome.css"
import LoginApi from "../../../../client-code/login";

export default class ProfileSettingsHome extends React.Component {
  constructor(props) {
    super(props);
    this.api = new LoginApi();
    this.state = {
      email: "",
      name: "",
      error: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginApi = new LoginApi();
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () => {
    // console.log("Fetching user details")
    this.api.getUserDetails().then((data) => {
      //console.log(data);
      this.setState({
        email: data.email,
        name: data.name,
        password: data.password,
      });
    });
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
    // console.log("Submitting updated password");
    this.loginApi.updatePassword({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,

    })
      .then(resJson => {
        if (resJson.error) {
          console.log(resJson.error);
          this.setState({
            error: resJson.error,
          });
        } else {
          alert("Your password has been sucessfully chaged!!");
          window.location.reload();
          //return resJson;
        }
      })
  };



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s3">
            <div className="profile">
              <p className="name">{this.state.name}</p>
              <img src="https://placehold.co/200x200/707070/FFFFFF/png" />
              <p className="since">Member since: <strong>Jan 01, 1990</strong></p>
            </div>
          </div>
          <div className="col s9" style={{ margin: 0 }}>
            <div className="edit-profile">
              <div className="header-box">
                <p>Edit Profile</p>
              </div>
              <form method="post" onSubmit={this.handleSubmit}>
                <div className="editor-box">
                  <div className="row">
                    <div className="col s6">
                      <label htmlFor="user-name">Name:</label>
                      <p>{this.state.name} </p>
                      <label htmlFor="user-password">Password</label>
                      <input
                        id="user-password"
                        className="form-content"
                        style={{ border: "3px solid #e1f1f2" }}
                        //  value={this.state.password}
                        type="password"
                        name="password"
                        onChange={this.handleInputChange}
                        required />
                      <br />
                      <input id="btn" type="submit" name="submit" value="CHANGE PASSWORD" style={{ width: "20vh" }} />
                    </div>
                    <div className="col s6">
                      <label htmlFor="user-email">Email</label>
                      <p> {this.state.email}</p>
                      <label htmlFor="user-password">Confirm Password</label>
                      <input
                        id="confirm-password"
                        className="form-content"
                        // value={this.state.password}
                        style={{ border: "3px solid #e1f1f2" }}
                        type="password"
                        name="confirm_password"
                        onChange={this.handleInputChange}
                        required />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}