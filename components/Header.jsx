// Импортираме Link (за навигация без презареждане) и useNavigate (за  пренасочване)
import { Link , useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';




function Header() {

  const navigate = useNavigate(); // Hook за пренасочване към друга страница
  const [user, setUser] = useState(null); // Състояние за текущия логнат потребител
     // При зареждане на компонента проверяваме дали има запазен потребител в localStorage 
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) { 
      setUser(JSON.parse(saved)); // Преобразуваме JSON string към обект

    }
  }, []);
       // Функция за изход — премахваме потребителя от localStorage и пренасочваме към login страницата
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
