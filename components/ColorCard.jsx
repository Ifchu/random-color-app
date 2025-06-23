// Функционален компонент ColorCard приема props: color (обект с име и hex стойност) и onDelete (функция за изтриване)
function ColorCard({ color, onDelete }) {
  return (
    <div style={{
      backgroundColor: color.hex,  // използваме hex стойността на цвета като фон
      color: "#fff",  // бял текст за контраст
      padding: "1rem", // вътрешен отстъп
      margin: "1rem 0", // разстояние между елементите по вертикала
      borderRadius: "8px" // заобляме краищата
    }}>
      <p><strong>{color.name}</strong> – {color.hex}</p>
      <button onClick={() => onDelete(color.id)}>Изтрий</button>
    </div>
  );
}

export default ColorCard;
