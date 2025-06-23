// Импортираме нужните React hook-ове и компонента за визуализиране на цвят
import { useEffect, useState } from "react";
import ColorCard from "../components/ColorCard";

function Home() {
    // Създаваме два state-а: един за списъка с цветове и един за състоянието на зареждане
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
    // Извличаме данни за потребителя от localStorage (ако има логнат потребител)
  const user = JSON.parse(localStorage.getItem("user"));
 // useEffect се изпълнява веднъж след първоначалното зареждане на компонента
  useEffect(() => { 
    fetchColors(); // зареждаме списъка с цветове от сървъра
  }, []);
// Функция за зареждане на цветовете от JSON Server
  const fetchColors = async () => {
    const res = await fetch("http://localhost:5000/colors"); // заявка към API-то 
    const data = await res.json();// преобразуваме отговорa в JSON
    setColors(data); // записваме получените цветове в state-а
    setLoading(false); // изключваме състоянието на зареждане
  };
 // Функция, която генерира произволен hex цвят и му задава име
  const generateRandomColor = () => {
    const hex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'); // генерираме hex код
    const name = "Color " + (colors.length + 1);  // задаваме име според броя на съществуващите цветове
    return { name, hex }; // връщаме обект с цвят
  };

   // Функция за добавяне на нов цвят към сървъра и към state-а
  const addColor = async () => { // създаваме нов цвят
    const newColor = generateRandomColor();
    const res = await fetch("http://localhost:5000/colors", {
      method: "POST", // POST заявка за добавяне 
      headers: { "Content-Type": "application/json" }, // указваме, че пращаме JSON
      body: JSON.stringify(newColor), // пращаме новия цвят
    }); 
    const added = await res.json(); // получаваме добавения обект от сървъра (с id)
    setColors([...colors, added]); // обновяваме списъка с цветове в state-а
  };
 // Функция за изтриване на цвят от сървъра и от state-а
  const deleteColor = async (id) => {
    if (!user) return; // ако няма логнат потребител, прекратяваме функцията

    await fetch(`http://localhost:5000/colors/${id}`, {
      method: "DELETE",
    });
    setColors(colors.filter(color => color.id !== id));
  };
 
    // JSX частта - рендериране на компонента
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