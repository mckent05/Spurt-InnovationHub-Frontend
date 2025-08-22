import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import LoginPage from "./components/sessions/LoginPage";
import RegisterPage from "./components/sessions/RegisterPage";
import { fetchUserProfile } from "./store/user/thunkCreators";
// import ClientDetailsPage from "./pages/ClientDetails";
// import ClientListPage from "./pages/ClientListPage";
// import ClientPage from "./pages/ClientPage";
// import ProjectPage from "./pages/ProjectPage";
// import ProjectListPage from "./pages/ProjectListPage";
// import AddNewProjectPage from "./pages/AddNewProjectPage";
// import AddNewClientPage from "./pages/AddNewClientPage";
import Main from "./pages/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

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
        <Route
          path="/login"
          element={<LoginPage loading={isLoading} signedIn={isSignedIn} />}
        />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Main />}>
            {/* Expert routes */}
            <Route
              path="dashboard"
              element={<ProtectedRoute allowedRoles={["expert"]} />}
            >
              <Route element={<ExpertDashboard />}>
                <Route index element={<ExpertBookingsPage />} />
                <Route
                  path="booking/:id"
                  element={<ExpertBookingDetailsPage />}
                />
                <Route path="add-new/expert" element={<AddNewExpert />} />
                <Route path="edit/:id" element={<AddNewExpert />} />
              </Route>
            </Route>

            {/* Manager routes */}
            <Route
              path="manager-dashboard"
              element={<ProtectedRoute allowedRoles={["hub_manager"]} />}
            >
              <Route element={<ManagerDashboard />}>
                <Route index element={<HubBookingsPage />} />
                <Route path="booking/:id" element={<HubBookingDetailsPage />} />
                <Route path="add-new" element={<AddNewHub />} />
                <Route path="edit/:id" element={<AddNewHub />} />
              </Route>
            </Route>

            {/* Admin routes */}
            <Route
              path="admin-dashboard"
              element={<ProtectedRoute allowedRoles={["admin"]} />}
            >
              <Route element={<AdminDashboard />}>
                <Route index element={<AdminOverviewPage />} />
                <Route path="users" element={<ManageUsersPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
