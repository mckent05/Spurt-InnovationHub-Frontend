import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "420px" }}>
        <h1 className="display-3 fw-bold text-danger">403</h1>
        <h2 className="h4 fw-semibold mb-3">Unauthorized Access</h2>
        <p className="text-muted mb-4">
          Sorry, you don’t have permission to view this page.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link to="/login" className="btn btn-outline-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
