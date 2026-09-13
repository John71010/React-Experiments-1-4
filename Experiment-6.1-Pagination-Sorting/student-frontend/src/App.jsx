import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/students";

function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Experiment 5.2 - API monitoring
  const [testId, setTestId] = useState("");
  const [apiResult, setApiResult] = useState(null);

  // ==============================
  // GET ALL STUDENTS
  // ==============================
  const fetchStudents = async () => {
  try {
    setError("");

    const url =
      `${API_URL}?page=${page}&size=${size}` +
      `&sort=${sortField},${sortDirection}`;

    const response = await fetch(url);

    const result = await response.json();

    if (response.ok) {
      setStudents(result.content || []);
      setTotalPages(result.totalPages || 0);
      setTotalElements(result.totalElements || 0);
    } else {
      setError(result.message || "Failed to load students.");
    }
  } catch (err) {
    setError("Unable to connect to backend.");
  }
};

  useEffect(() => {
  fetchStudents();
}, [page, size, sortField, sortDirection]);
  // ==============================
  // HANDLE INPUT
  // ==============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // ADD / UPDATE STUDENT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!form.name || !form.email || !form.age) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-Correlation-ID": "REACT-12345",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          age: Number(form.age),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong.");
        return;
      }

      setMessage(
        editingId
          ? "Student updated successfully!"
          : "Student added successfully!"
      );

      setForm({
        name: "",
        email: "",
        age: "",
      });

      setEditingId(null);

      fetchStudents();
    } catch (err) {
      setError("Cannot connect to Spring Boot server.");
    }
  };

  // ==============================
  // EDIT STUDENT
  // ==============================
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      age: student.age,
    });

    setEditingId(student.id);
    setMessage("");
    setError("");
  };

  // ==============================
  // DELETE STUDENT
  // ==============================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "X-Correlation-ID": "REACT-DELETE-12345",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Delete failed.");
        return;
      }

      setMessage("Student deleted successfully!");

      fetchStudents();
    } catch (err) {
      setError("Cannot connect to Spring Boot server.");
    }
  };

  // ==============================
  // CANCEL EDIT
  // ==============================
  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      age: "",
    });
  };

  // ==============================
  // EXPERIMENT 5.2
  // TEST API / EXCEPTION HANDLING
  // ==============================
  const testStudent = async () => {
    setApiResult(null);

    if (!testId) {
      setApiResult({
        type: "error",
        message: "Please enter a student ID.",
      });
      return;
    }

    const correlationId = `REACT-TEST-${testId}`;

    try {
      const response = await fetch(`${API_URL}/${testId}`, {
        method: "GET",
        headers: {
          "X-Correlation-ID": correlationId,
        },
      });

      const result = await response.json();

      setApiResult({
        type: response.ok ? "success" : "error",
        status: response.status,
        message: result.message || "Request completed.",
        correlationId:
          result.correlationId || correlationId,
      });
    } catch (err) {
      setApiResult({
        type: "error",
        message: "Cannot connect to Spring Boot server.",
        correlationId: correlationId,
      });
    }
  };

  // ==============================
  // INTERFACE
  // ==============================
  return (
    <div className="app">
      <div className="container">

        {/* HEADER */}
        <div className="header">
          <h1>🎓 Student Management</h1>
          <p>
            Manage student records with React & Spring Boot
          </p>
        </div>

        <div className="dashboard">

          {/* ADD / UPDATE FORM */}
          <div className="card">

            <h2>
              {editingId
                ? "✏️ Update Student"
                : "➕ Add Student"}
            </h2>

            <form onSubmit={handleSubmit}>

              <label>Student Name</label>

              <input
                type="text"
                name="name"
                placeholder="e.g. John"
                value={form.name}
                onChange={handleChange}
              />

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="e.g. john@gmail.com"
                value={form.email}
                onChange={handleChange}
              />

              <label>Age</label>

              <input
                type="number"
                name="age"
                placeholder="e.g. 20"
                value={form.age}
                onChange={handleChange}
              />

              <div className="buttons">

                <button type="submit">
                  {editingId
                    ? "Update Student"
                    : "Add Student"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="cancel"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

            {message && (
              <div className="success">
                ✓ {message}
              </div>
            )}

            {error && (
              <div className="error">
                ⚠ {error}
              </div>
            )}

          </div>

          {/* STUDENT LIST */}
          <div className="card">
            <div className="pagination-controls">
  <label>
    Sort By:
    <select
      value={sortField}
      onChange={(e) => {
        setSortField(e.target.value);
        setPage(0);
      }}
    >
      <option value="id">ID</option>
      <option value="name">Name</option>
      <option value="email">Email</option>
      <option value="age">Age</option>
    </select>
  </label>

  <label>
    Order:
    <select
      value={sortDirection}
      onChange={(e) => {
        setSortDirection(e.target.value);
        setPage(0);
      }}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </label>

  <label>
    Per Page:
    <select
      value={size}
      onChange={(e) => {
        setSize(Number(e.target.value));
        setPage(0);
      }}
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </label>
</div>
            <h2>👥 Students</h2>

            <span className="student-count">
              {students.length} Student
              {students.length !== 1 ? "s" : ""}
            </span>

            {students.length === 0 ? (
              <p className="empty">
                No students found yet.
              </p>
            ) : (
              <div className="table-container">

                <table>

                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {students.map((student) => (
                      <tr key={student.id}>

                        <td>{student.id}</td>

                        <td>
                          <strong>
                            {student.name}
                          </strong>
                        </td>

                        <td>{student.email}</td>

                        <td>{student.age}</td>

                        <td>

                          <button
                            className="edit"
                            onClick={() =>
                              handleEdit(student)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete"
                            onClick={() =>
                              handleDelete(student.id)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    ))}
                    <h2>Student List</h2>

{/* SORTING CONTROLS */}
<div className="pagination-controls">

</div>

{/* YOUR EXISTING STUDENT LIST */}

{/* PAGINATION BUTTONS */}
<div className="page-navigation">

</div>

<p>Total Students: {totalElements}</p>

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </div>

        {/* EXPERIMENT 5.2 MONITORING */}
        <div className="card monitoring-card">

          <h2>🔍 API Monitoring</h2>

          <p className="monitoring-text">
            Test exception handling and request tracing.
          </p>

          <label>Student ID</label>

          <input
            type="number"
            placeholder="Enter ID, e.g. 999"
            value={testId}
            onChange={(e) =>
              setTestId(e.target.value)
            }
          />

          <button
            className="test-button"
            onClick={testStudent}
          >
            Test Student API
          </button>

          {apiResult && (
            <div
              className={
                apiResult.type === "error"
                  ? "api-error"
                  : "api-success"
              }
            >

              <strong>
                {apiResult.type === "error"
                  ? "⚠ API Error"
                  : "✓ API Success"}
              </strong>

              {apiResult.status && (
                <p>
                  <strong>Status:</strong>{" "}
                  {apiResult.status}
                </p>
              )}

              <p>
                <strong>Message:</strong>{" "}
                {apiResult.message}
              </p>

              {apiResult.correlationId && (
                <p>
                  <strong>Correlation ID:</strong>{" "}
                  {apiResult.correlationId}
                </p>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;