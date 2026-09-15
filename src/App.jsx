import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import Meetings from "./pages/Meetings";
import AddMeeting from "./pages/AddMeeting";
function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/add-customer"
          element={<AddCustomer />}
        />
        <Route
          path="/meetings"
          element={<Meetings />}
        />
        <Route
          path="/add-meeting"
          element={<AddMeeting />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;