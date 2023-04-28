import "./HeaderBar.css";
import LoginApi from "../../../../client-code/login";

export function HeaderBar() {
  let loginApi = new LoginApi();

  function handleLogOut() {
    loginApi.logout();
  }

  return (
    <div className="z-depth-1 nav-wrapper">
      <div className="container">
        <div className="row nav-bar">
          <div className="col s3 logo">
            <i className="small material-icons">account_balance_wallet</i>
            <span>
              <a href="/dashboard">Nemo</a>
            </span>
          </div>
          <div className="col s8 menu">
            {/* <Link to="/loggedIn/categories">Categories</Link> */}
            {/* <Link to="account">Account</Link> */}
          </div>
          <div className="col s1 dropdown">
              <div className="dropdown-showable">
                <i className="small material-icons">account_circle</i>
              </div>
              <div className="dropdown-hidden-menu">
                <a href="#">Profile Settings</a>
                <a href="#" onClick={handleLogOut}>Logout</a>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
