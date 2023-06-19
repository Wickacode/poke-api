import React from "react";
import ImgPikachu from "../pika.png";

export default function Card() {
  return (
    <div>
      <div>
        <div className="pokeList">
          <h4>Id : 1</h4>
          <img src={ImgPikachu} alt="image de test" />
          <span>Pikachu</span>
        </div>
      </div>
    </div>
  );
}
