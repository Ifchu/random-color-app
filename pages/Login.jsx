// Импортираме useState за състояния и useNavigate за пренасочване
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
   // Състояния за полетата и за съобщения за грешка
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();// React Router hook за пренасочване
 // Основна функция, която се стартира при натискане на бутона за вход
  const handleLogin = async (e) => {
    e.preventDefault(); // Предотвратява презареждане на страницата

      // Извличаме списъка с регистрирани потребители от сървъра
    try {
      const res = await fetch("http://localhost:5000/users");
      const users = await res.json();
       // Проверяваме дали има потребител със съвпадащи имейл и парола
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Ако намерим — записваме потребителя в localStorage и пренасочваме към началната страница
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } // Ако няма съвпадение — показваме съобщение за грешка
      else {
        setError("Невалиден имейл или парола.");
      }
    } // Ако възникне проблем при fetch заявката
    catch (err) {
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
