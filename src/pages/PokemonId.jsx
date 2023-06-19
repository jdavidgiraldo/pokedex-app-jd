import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null)

  const { pokemonName } = useParams()

  const percenProgresStat = (baseStat) => {
    const STAT_MAX = 255
    return `${(baseStat * 100) / 255}%`
  }
  
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    
    axios.get(url)
      .then(({ data }) => setPokemon(data))
      .catch(err => console.log(err))

  }, [])

  return (
    <main>
      <Header />
      <section>
        {/*informacion del pokemon */}
        <article>




          {/*stats */}

          <section className='px-2'>
            <h4>stats</h4>

            <section>
              {
                pokemon?.stats.map((stat) => (
                  <article key={stat.stat.url}>
                    <section>
                      <h5>{stat.stat.name}</h5>
                      <span>{stat.base_stat}</span>
                    </section>

                    {/*barra de prgreso de stat */}

                    <div className='bg-gray-300 h-8 rounded-md overflow-hidden'>
                      <div style={{width: percenProgresStat(stat.base_stat)}} className={' h-full bg-yellow-500'}></div>
                    </div>

                  </article>
                ))
              }
            </section>
          </section>
        </article>

      </section>
    </main>
  )
}

export default PokemonId