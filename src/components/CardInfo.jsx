import React from 'react'

export default function CardInfo() {
  return (
    <div className='cardInfoContainer'>
      <h1>Pikachu</h1>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg" alt="" />
      <ul className="abilities">
        <li>static</li>
        <li>lightning-rod</li>
      </ul>
      <div className="stats">
        <span>HP: 30</span>
        <span>Attack : 52</span>
        <span>Defense : 43</span>
        <span>Special Attack : 50</span>
        <span>Speed</span>
      </div>
    </div>
  )
}

