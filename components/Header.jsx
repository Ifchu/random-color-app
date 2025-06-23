import { Link , useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';




function Header() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
      
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

    const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header>
      <img src="/src/assets/palette-color.png" alt=" palette color icon" />
      <nav style={{ padding: "1rem", background: "transparent" }}>
      <Link to="/">Home</Link> |{" "}
      {!user ? (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span>Здравей, {user.name}!</span> |{" "}
          <button onClick={handleLogout}>Изход</button>
        </>
      )}
    </nav>
      <h1>Random Color</h1>
    </header>
  );
}

export default Header
