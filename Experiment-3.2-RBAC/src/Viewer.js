import Navbar from "./Navbar";

function Viewer() {

  return (

    <>
      <Navbar />

      <div className="dashboard">

        <h2>Viewer Dashboard</h2>

        <div className="card">
          View Content
        </div>

        <div className="card">
          View Reports
        </div>

        <div className="card">
          Profile
        </div>

      </div>

    </>

  );

}

export default Viewer;