function ColorCard({ color, onDelete }) {
  return (
    <div style={{
      backgroundColor: color.hex,
      color: "#fff",
      padding: "1rem",
      margin: "1rem 0",
      borderRadius: "8px"
    }}>
      <p><strong>{color.name}</strong> – {color.hex}</p>
      <button onClick={() => onDelete(color.id)}>Изтрий</button>
    </div>
  );
}

export default ColorCard;
