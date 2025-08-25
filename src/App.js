import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import LoginPage from "./components/sessions/LoginPage";
import RegisterPage from "./components/sessions/RegisterPage";
import ExpertBookingDetails from "./components/experts/ExpertBookingDetails";
import ExpertBookings from "./components/experts/ExpertBookings";
import AddNewExpert from "./components/experts/AddNewExpert";
import ExpertDashboard from "./pages/ExpertDashboard/ExpertDashboard";
import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import HubBookingDetails from "./components/hubs/HubBookingDetails";
import HubBookings from "./components/hubs/HubBookings";
import AddNewHub from "./components/hubs/AddNewHub";
import AdminOverview from "./components/admin/AdminOverview";
import { fetchUserProfile } from "./store/user/thunkCreators";
import Main from "./pages/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Unauthorized from "./components/Unauthorized";

function App() {
  const sessionDetails = useSelector((state) => state.sessions);

  const userDetails = useSelector((state) => state.user);

  const { isLoading, isSignedIn } = sessionDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={<LoginPage loading={isLoading} signedIn={isSignedIn} />}
        />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Main />}>
            {/* Default route for root path */}
            <Route index element={<div>Welcome to the App</div>} />{" "}
            {/* Replace with actual component */}
            {/* Expert Routes */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={["expert"]}>
                  <ExpertDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<ExpertBookings />} />
              <Route path="booking/:id" element={<ExpertBookingDetails />} />
              <Route path="add-new/expert" element={<AddNewExpert />} />
              <Route path="edit/:id" element={<AddNewExpert />} />
            </Route>
            {/* Manager Routes */}
            <Route
              path="manager-dashboard"
              element={
                <ProtectedRoute allowedRoles={["hub_manager"]}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<HubBookings />} />
              <Route path="booking/:id" element={<HubBookingDetails />} />
              <Route path="add-new" element={<AddNewHub />} />
              <Route path="edit/:id" element={<AddNewHub />} />
            </Route>
            {/* Admin Routes */}
            <Route
              path="admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              {/* Uncomment and implement these routes as needed */}
              <Route index element={<AdminOverview />} />
              {/* <Route path="users" element={<ManageUsersPage />} /> */}
              {/* <Route path="settings" element={<AdminSettingsPage />} /> */}
            </Route>
          </Route>
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </div>
  );
}

export default App;
