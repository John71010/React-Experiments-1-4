import { Link } from "react-router-dom";

function Unauthorized() {

  return (

    <div className="container">

      <div className="box">

        <h2>Access Denied</h2>

        <p>
          You are not authorized to view this page.
        </p>

        <Link to="/">
          Go Back
        </Link>

      </div>

    </div>

  );

}

export default Unauthorized;