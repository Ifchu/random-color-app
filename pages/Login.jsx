import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users");
      const users = await res.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Записваме в localStorage
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        setError("Невалиден имейл или парола.");
      }
    } catch (err) {
      setError("Грешка при връзка със сървъра.");
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Имейл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Парола"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Вход</button>
      </form>
    </div>
  );
}

export default Login;
