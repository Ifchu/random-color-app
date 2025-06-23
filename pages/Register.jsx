// Импортираме useState за състоянията на формата и useNavigate за пренасочване след регистрация
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
   // Създаваме състояния за въведените стойности и за евентуални грешки
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
 
  // Hook за пренасочване между страници (React Router)
  const navigate = useNavigate();

   // Основна функция, която се изпълнява при натискане на бутона за регистрация
  const handleRegister = async (e) => {
    e.preventDefault(); // спираме презареждането на страницата
    // Проверка дали всички полета са попълнени
    if (!email || !password || !name) {
      setError("Моля, попълни всички полета.");
      return;
    }

    try {
     // Извличаме списъка с вече регистрирани потребители от сървъра
      const res = await fetch("http://localhost:5000/users");
      const users = await res.json();
      const userExists = users.find(u => u.email === email);

          // Проверяваме дали вече има потребител с този имейл
      if (userExists) {
        setError("Този имейл вече е регистриран.");
        return;
      }

      // Създаваме нов потребителски обект
      const newUser = { id: Date.now(), name, email, password };  // генерираме уникално ID чрез текущото време
       // Изпращаме POST заявка до сървъра, за да запишем новия потребител
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      // След успешна регистрация — пренасочваме към страницата за вход
      navigate("/login");
    } catch (err) {
      setError("Възникна грешка при регистрацията.");
    }
  };
  // JSX частта: форма за регистрация
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
