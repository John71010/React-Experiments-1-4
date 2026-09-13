import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [method, setMethod] = useState("None");
  const [responseTime, setResponseTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Select a query strategy to begin performance testing."
  );

  const runQuery = async (endpoint, methodName) => {
    try {
      setLoading(true);
      setMessage(`Running ${methodName}...`);

      const start = performance.now();

      const response = await fetch(
        `http://localhost:8081/api/students/${endpoint}`
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      const end = performance.now();

      setStudents(data);
      setMethod(methodName);
      setResponseTime((end - start).toFixed(2));
      setMessage(`${methodName} completed successfully.`);
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the Spring Boot backend.");
    } finally {
      setLoading(false);
    }
  };

  const clearCache = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/students/cache",
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to clear cache");
      }

      setMessage("Cache cleared successfully. The next cached request will access the database.");
      setMethod("Cache Cleared");
      setResponseTime(null);
    } catch (error) {
      console.error(error);
      setMessage("Unable to clear cache.");
    }
  };

  return (
    <div className="app">
      <header>
        <div>
          <p className="eyebrow">SPRING BOOT PERFORMANCE LAB</p>
          <h1>Backend Read Optimization</h1>
          <p className="subtitle">
            Database query optimization and caching performance dashboard
          </p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          Backend : 8081
        </div>
      </header>

      <main>
        <section className="summary-grid">
          <div className="summary-card">
            <span>Database</span>
            <strong>MySQL</strong>
          </div>

          <div className="summary-card">
            <span>Students Loaded</span>
            <strong>{students.length}</strong>
          </div>

          <div className="summary-card">
            <span>Current Strategy</span>
            <strong>{method}</strong>
          </div>

          <div className="summary-card">
            <span>Response Time</span>
            <strong>
              {responseTime ? `${responseTime} ms` : "--"}
            </strong>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Query Performance Test</h2>
              <p>Run the same read operation using different strategies.</p>
            </div>
          </div>

          <div className="buttons">
            <button
              className="nplus"
              onClick={() => runQuery("nplusone", "N+1 Query")}
              disabled={loading}
            >
              Run N+1 Query
            </button>

            <button
              className="optimized"
              onClick={() => runQuery("optimized", "Optimized Query")}
              disabled={loading}
            >
              Run Optimized Query
            </button>

            <button
              className="cached"
              onClick={() => runQuery("cached", "Cached Query")}
              disabled={loading}
            >
              Run Cached Query
            </button>

            <button
              className="clear"
              onClick={clearCache}
              disabled={loading}
            >
              Clear Cache
            </button>
          </div>

          <div className="result">
            <div>
              <span>Latest Operation</span>
              <strong>{method}</strong>
            </div>

            <div>
              <span>Measured Response</span>
              <strong>
                {loading
                  ? "Running..."
                  : responseTime
                  ? `${responseTime} ms`
                  : "--"}
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{loading ? "Processing" : "Ready"}</strong>
            </div>
          </div>

          <p className="message">{message}</p>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Student Records</h2>
              <p>Data returned by the selected backend read operation.</p>
            </div>

            <span className="record-count">
              {students.length} records
            </span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Department</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty">
                      Run a query to load student records.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>#{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        <span className="department">
                          {student.department?.name}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="strategy-grid">
          <div className="strategy-card">
            <span className="number">01</span>
            <h3>N+1 Query</h3>
            <p>
              Students are retrieved first and related departments are
              lazy-loaded using additional database queries.
            </p>
          </div>

          <div className="strategy-card">
            <span className="number">02</span>
            <h3>Optimized Query</h3>
            <p>
              JOIN FETCH retrieves students and their departments together,
              reducing unnecessary database operations.
            </p>
          </div>

          <div className="strategy-card">
            <span className="number">03</span>
            <h3>Cached Query</h3>
            <p>
              Frequently requested results are stored in memory, reducing
              repeated database access.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;