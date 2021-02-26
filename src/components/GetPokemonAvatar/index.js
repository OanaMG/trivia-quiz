import { useEffect, useState } from 'react';
//import useRandomizer from "../hooks/useRandomizer"

function GetPokemonAvatar(){
    const [pokemon, setPokemon] = useState({});
    const [id, setId] = useState(randomNumber());

    function randomNumber(min = 1, max =  151){
        return (Math.floor(Math.random()*max)+min);
    };

    useEffect(()=>{
        async function fetchPokemon(){
            const result = await fetch(`${process.env.REACT_APP_POKEMONAPI_URL}${id}`);
            const data = await result.json();
            //console.log(data)
            setPokemon(data);
        }
        setId(id);
        //console.log(id);
        fetchPokemon();
    },[]);

    return (
        <div>
            <img src= {pokemon.sprites?.front_default} alt={pokemon.id}></img>
        </div>
    )

}

export default GetPokemonAvatar;
// fetch pokemon inages front and back into object.

