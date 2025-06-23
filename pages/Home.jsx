import { useEffect, useState } from "react";
import ColorCard from "../components/ColorCard";

function Home() {
  // 🔵 Локално състояние: масив с цветове, и флаг за зареждане
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Проверка дали потребител е логнат (от localStorage)
  const user = JSON.parse(localStorage.getItem("user"));

  // 🟡 Зареждаме цветовете от json-server при първоначално зареждане на компонента
  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    const res = await fetch("http://localhost:5000/colors");
    const data = await res.json();
    setColors(data);
    setLoading(false);
  };

  // 🟢 Генериране на случаен HEX цвят и име
  const generateRandomColor = () => {
    const hex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const name = "Color " + (colors.length + 1);
    return { name, hex };
  };

  // 🟠 Добавяне на нов цвят в json-server
  const addColor = async () => {
    const newColor = generateRandomColor();
    const res = await fetch("http://localhost:5000/colors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newColor),
    });
    const added = await res.json();
    setColors([...colors, added]);
  };

  // 🔴 Изтриване на цвят по ID (само ако има логнат потребител)
  const deleteColor = async (id) => {
    if (!user) return; // защита от изтриване ако не е логнат

    await fetch(`http://localhost:5000/colors/${id}`, {
      method: "DELETE",
    });
    setColors(colors.filter(color => color.id !== id));
  };

  return (
    <div className="container">
      <h2>Списък с Цветове</h2>

      {/* Показваме бутона за добавяне само ако има логнат потребител */}
      {user && <button onClick={addColor}>Добави Случаен Цвят</button>}

      {loading ? (
        <p>Зареждане...</p>
      ) : (
        colors.map((color) => (
          <ColorCard
            key={color.id}
            color={color}
            onDelete={user ? deleteColor : null} // предаваме delete функция само ако е логнат
          />
        ))
      )}
    </div>
  );
}

export default Home;