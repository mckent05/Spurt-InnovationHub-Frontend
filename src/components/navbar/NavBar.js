import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleSignOut } from "../../store/sessions/thunkCreators";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = async () => {
    const result = await dispatch(handleSignOut());
    if (handleSignOut.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error(result.payload);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand fw-bold fs-4 text-dark">
          Spurt Innovation Hub
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
            {[
              { path: "/", label: "Home", exact: true },
              { path: "/experts", label: "Experts" },
              { path: "/hubs", label: "Hubs" },
              { path: "/wallet", label: "Wallet" },
              { path: "/admin", label: "Admin" },
            ].map(({ path, label, exact }) => (
              <li key={label} className="nav-item">
                <NavLink
                  to={path}
                  end={exact}
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 rounded fw-semibold ${
                      isActive ? "text-white bg-warning" : "text-dark"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex">
            <button
              className="btn btn-outline-warning fw-bold px-4"
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
