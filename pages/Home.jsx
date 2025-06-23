import { useEffect, useState } from "react";
import ColorCard from "../components/ColorCard";

function Home() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Зареждане на всички цветове
  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    const res = await fetch("http://localhost:5000/colors");
    const data = await res.json();
    setColors(data);
    setLoading(false);
  };

  const generateRandomColor = () => {
    const hex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const name = "Color " + (colors.length + 1);
    return { name, hex };
  };

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

  const deleteColor = async (id) => {
    await fetch(`http://localhost:5000/colors/${id}`, {
      method: "DELETE",
    });
    setColors(colors.filter(color => color.id !== id));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Списък с Цветове</h2>
      <button onClick={addColor}>Добави Случаен Цвят</button>

      {loading ? (
        <p>Зареждане...</p>
      ) : (
        colors.map((color) => (
          <ColorCard key={color.id} color={color} onDelete={deleteColor} />
        ))
      )}
    </div>
  );
}

export default Home;