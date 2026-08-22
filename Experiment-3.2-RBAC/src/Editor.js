import Navbar from "./Navbar";

function Editor() {

  return (

    <>
      <Navbar />

      <div className="dashboard">

        <h2>Editor Dashboard</h2>

        <div className="card">
          Manage Content
        </div>

        <div className="card">
          Edit Articles
        </div>

        <div className="card">
          View Reports
        </div>

      </div>

    </>

  );

}

export default Editor;