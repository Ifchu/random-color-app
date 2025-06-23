import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setError("Моля, попълни всички полета.");
      return;
    }

    try {
      // Проверка дали потребителят вече съществува
      const res = await fetch("http://localhost:5000/users");
      const users = await res.json();
      const userExists = users.find(u => u.email === email);

      if (userExists) {
        setError("Този имейл вече е регистриран.");
        return;
      }

      // Създаване на нов потребител
      const newUser = { id: Date.now(), name, email, password };

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      navigate("/login");
    } catch (err) {
      setError("Възникна грешка при регистрацията.");
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Име"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
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
        <button type="submit">Регистрирай се</button>
      </form>
    </div>
  );
}

export default Register;
