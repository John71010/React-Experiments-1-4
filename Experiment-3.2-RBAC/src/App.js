import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Admin from "./Admin";
import Editor from "./Editor";
import Viewer from "./Viewer";
import Unauthorized from "./Unauthorized";
import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
            >
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor"
          element={
            <ProtectedRoute
              allowedRoles={["Editor"]}
            >
              <Editor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewer"
          element={
            <ProtectedRoute
              allowedRoles={["Viewer"]}
            >
              <Viewer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;