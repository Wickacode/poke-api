import React from 'react'
import PokeLogo from "./pokeLogo.png"

function NavLogo() {
  return (
    <div className='navLogo'>
      <img src={PokeLogo} alt="Logo Pokémon" />
    </div>
  )
}

export default NavLogo
