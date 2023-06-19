import React from 'react'

export default function CardInfo({data}) {
  console.log(data);
  return (
    <div className='cardInfoContainer'>
      {!data ? (
        ""
      ) : (
        <>
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=''
          />
          <ul className='abilities'>
            {
              data.abilities.map(poke=> {
                return(
                  <>
                  <li>{poke.ability.name}</li>
                  </>
                )
              })
            }
            
          </ul>
          <div className='stats'>
            {
              data.stats.map(poke=>{
                return(
                  <>
                  <span>{poke.stat.name}: {poke.base_stat}</span>
                  </>
                )
              })
            }
          </div>
        </>
      )}
    </div>
  );
}

