import './Home.css'



export default function Home({ title }) {
  return (
    <div>
      <div className="big-image">
        <div className="container big-image-container">
          <div className="row big-image-row">

            <div class="col s5">

            </div>
            <div className="col s7">
              <div className="section">
                <h1 style={{ fontFamily: '"Lobster", cursive', fontSize: '50px' }}><i class="small material-icons">account_balance_wallet</i> Nemo</h1>
                <p>The new way to track your expenses and manage your finance. Coming soon to the App Store.  </p>
              </div>
              <div className="section">
                <a class="waves-effect waves-light btn-large" href="/login">Login</a>
                &nbsp;&nbsp;&nbsp;
                <a class="waves-effect waves-light btn-large" href="/register">Signup</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container footer-container">
          &copy; 2023 Nemo App. All right reserved.
        </div>
      </div>
    </div >
  );
}