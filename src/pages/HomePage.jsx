import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          MySite
        </div>
        <div className="navbar-links">
          <button onClick={() => navigate("/")} className="nav-button">Home</button>
          <button onClick={() => navigate("/about")} className="nav-button">About</button>
          <button onClick={() => navigate("/contact")} className="nav-button">Contact</button>
          <button onClick={() => navigate("/products")} className="nav-button">Products</button>
          <button onClick={handleLogout} className="nav-button logout-button">Logout</button>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="hero-section">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Welcome to MySite</h1>
          <p className="dashboard-subtitle">
            Manage tasks, explore products, and stay connected — all in one place.
          </p>

          <div className="button-group">
            <button onClick={() => navigate("/login")} className="secondary-button">Login</button>
            <button onClick={() => navigate("/signup")} className="secondary-button">Signup</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
