import featImg from "../assets/img-main.jpg";
import {Link} from 'react-router-dom';

export default function Home({ title }) {
  return (
    <div className="container">
      <img
        className="img-feat"
        src={featImg}
        alt="this is test"
      />

      <h1>{title}</h1>
      <Link to='/login'> Login</Link>
      <Link to='/register'> Sign Up</Link>
      <p>
        This is a expense management created by{" "}
    
        , solely for the creation and development of educational training
        materials. Any resemblance to real products or services is purely
        coincidental. Information provided about the products or services is
        also fictitious and should not be construed as representative of actual
        products or services on the market in a similar product or service
        category.
      </p>
    </div>
  );
}