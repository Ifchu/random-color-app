
import { useState } from "react";

function Home() {
   
  const [color, setColor] = useState("#ffffff");

    <button
  onClick={handleClick}
  style={{ padding: "10px 20px", marginTop: "10px" }}
>
  New Color
</button>


  return (
    <div>
      <h1>Random Color App</h1>
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: color,
          margin: "20px auto",
        }}
      >
        <button onClick={handleClick}>New Color</button>
      </div>
    </div>
  );
};

export default Home;