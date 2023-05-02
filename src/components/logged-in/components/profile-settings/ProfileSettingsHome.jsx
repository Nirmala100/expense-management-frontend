import React from "react";
import profile from "../../../../assets/profile-image.jpeg"
import "./ProfileSettingsHome.css"

export default class ProfileSettingsHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s3">
            <div className="profile">
              <p className="name">Nirmala Shrestha</p>
              <img src="https://placehold.co/200x200/707070/FFFFFF/png" />
              <p className="since">Member since: <strong>Jan 01, 1990</strong></p>
            </div>
          </div>
          <div className="col s9" style={{ margin: 0 }}>
            <div className="edit-profile">
              <div className="header-box">
                <p>Edit Profile</p>
              </div>
              <div className="editor-box">
                <div className="row">
                  <div className="col s6">
                    <p>Name: Nirmala Shrestha </p>
                    <label htmlFor="user-password">Password</label>
                    <input
                      id="user-password"
                      className="form-content"
                      value=""
                      type="password"
                      name="password"
                      required />
                    <input id="submit-btn" type="submit" name="submit" value="CHANGE PASSWORD" />
                  </div>
                  <div className="col s6">
                    <p>Email: nemo@gmail.com</p>
                    <label htmlFor="user-password">Confirm Password</label>
                    <input
                      id="confirm-password"
                      className="form-content"
                      value=""

                      type="password"
                      name="confirm_password"
                      required />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}