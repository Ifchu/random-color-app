import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <img src="/src/assets/" alt=" icon" />
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <h1>Random Color</h1>
    </header>
  );
}
