import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import './PokemonInfo.css';

function defineVariant(number) {
    if (number > 80) return "success";
    else return "warning";

}
const PokemonInfo = data => {

    const PokemonImg = data.pokemon.sprites.other['official-artwork'].front_default;
    const [genus, setGenus] = useState('');
    const types = data.pokemon.types.map(item => item.type.name)
    console.log(data.pokemon.abilities)
    let count = 0;

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon-species/' + data.pokemon.id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setGenus(data.genera[7].genus);
            })
    }, [data]);

    return (
        <div>
            <div className="dataContainer">
                <div>
                    <div><img src={PokemonImg} alt="ImagePokemon" /> </div>
                </div>
                <div>
                    <h1><b>Pokedex Data</b></h1>
                    <hr />
                    <div><span style={{ color: 'gray' }}>National No:</span> <b>{data.pokemon.id}</b></div>
                    <div style={{ color: 'gray', fontSize: 'large' }}>Type{types.map(item => <Badge style={{ color: "white", fontWeight: "500", marginRight: "5px", marginLeft: '5px', fontSize: 'large' }} variant="warning">{item}</Badge>)}</div>
                    <hr />
                    <div><span style={{ color: 'gray' }}>Species </span>{genus}</div>
                    <div><span style={{ color: 'gray' }}>Height </span>{(data.pokemon.height / 10 * 2.6).toFixed(1)}  ({data.pokemon.height / 10} m)</div>
                    <hr />
                    <div><span style={{ color: 'gray' }}>Weight </span> {(data.pokemon.weight / 10 * 2.205).toFixed(1)} lbs ({data.pokemon.weight / 10} kg)</div>
                    <div><span style={{ color: 'gray' }}>Abilities </span>{
                        data.pokemon.abilities.map(item => {
                            if (!item.is_hidden) {
                                ++count
                                return (<div>{count}. <a style={{textTransform:'capitalize'}} href={item.ability.url}>{item.ability.name}</a></div>)
                                
                            }
                            else {
                                return (<div ><a style={{textTransform:'capitalize'}} href={item.ability.url}>{item.ability.name}</a></div>)
                            }

                            

                        })
                    }
                    </div>
                </div>
            </div>
            <div className='BaseStatsContainer'>
                <h1>Base Stats</h1>
                <div>HP     {data.pokemon.stats[0].base_stat}    <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[0].base_stat)} now={data.pokemon.stats[0].base_stat} /></div>
                <div>Attack     {data.pokemon.stats[1].base_stat}   <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[1].base_stat)} now={data.pokemon.stats[1].base_stat} /></div>
                <div>Defense    {data.pokemon.stats[2].base_stat}   <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[2].base_stat)} now={data.pokemon.stats[2].base_stat} /></div>
                <div>Sp. Attack     {data.pokemon.stats[3].base_stat}   <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[3].base_stat)} now={data.pokemon.stats[3].base_stat} /></div>
                <div>Sp. Def    {data.pokemon.stats[4].base_stat}   <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[4].base_stat)} now={data.pokemon.stats[4].base_stat} /></div>
                <div>Speed      {data.pokemon.stats[5].base_stat}   <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[5].base_stat)} now={data.pokemon.stats[5].base_stat} /></div>
            </div>

        </div>
    )

}

export default PokemonInfo;