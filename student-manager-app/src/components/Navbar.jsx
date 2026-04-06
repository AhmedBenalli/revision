import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary mb-4 p-2 fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🎓 StudentManagerApp</Link>
        <div className="navbar-nav flex-row gap-3">
          <Link className="nav-link" to="/">Liste des étudiants</Link>
          <Link className="nav-link" to="/add">Ajouter un étudiant</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;