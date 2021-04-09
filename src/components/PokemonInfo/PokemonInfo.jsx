import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import './PokemonInfo.css';

function defineVariant(number) {
    if (number > 80) return "success";
    else return "warning";

}
const PokemonInfo = data => {

    
    const PokemonImg = data.pokemon.sprites.other['official-artwork'].front_default;
    const [genus, setGenus] = useState('');
    const types = data.pokemon.types.map(item => item.type.name)
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
                <div className='imgContainer'>
                    <div><img src={PokemonImg} alt="ImagePokemon" /> </div>
                </div>
                <div>
                    <h1><b>Pokédex Data</b></h1>
                    <hr />
                    <div><span className="grayText">National No:</span> <b>{data.pokemon.id}</b></div>
                    <div style={{ color: 'gray', fontSize: 'large' }}>Type{types.map(item => <Badge key={item} style={{ color: "white", fontWeight: "500", marginRight: "5px", marginLeft: '5px', fontSize: 'large' }} variant="warning">{item}</Badge>)}</div>
                    <hr />
                    <div><span className="grayText">Species </span>{genus}</div>
                    <div><span className="grayText">Height </span>{(data.pokemon.height / 10 * 2.6).toFixed(1)}  ({data.pokemon.height / 10} m)</div>
                    <hr />
                    <div><span className="grayText">Weight </span> {(data.pokemon.weight / 10 * 2.205).toFixed(1)} lbs ({data.pokemon.weight / 10} kg)</div>
                    <div><span className="grayText">Abilities </span>{
                        data.pokemon.abilities.map((item, index) => {
                            if (!item.is_hidden) {
                                ++count
                                return (<div key={index} >{count}. <a style={{textTransform:'capitalize'}} href={item.ability.url}>{item.ability.name}</a></div>)
                                
                            }
                            else {
                                return (<div key={index} className="grayText"><a style={{textTransform:'capitalize'}} href={item.ability.url}>{item.ability.name}</a>(hidden)</div>)
                            }

                            

                        })
                    }
                    </div>
                </div>
            </div>
            <h1 className='title'><b>Base Stats</b></h1>
            <div className='baseContainer'>
                <p/><hr/><hr/><hr/><p/>
                <span/>
                <div >HP</div>
                <b>{data.pokemon.stats[0].base_stat}</b>  
                <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[0].base_stat)} now={data.pokemon.stats[0].base_stat} />
                <span/>
                <p/><hr/><hr/><hr/><p/><span/>
                <div>Attack</div>
                <b>{data.pokemon.stats[1].base_stat}</b>   
                <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[1].base_stat)} now={data.pokemon.stats[1].base_stat} />
                <span/><p/><hr/><hr/><hr/><p/><span/>
                <div>Defense</div>    
                <b>{data.pokemon.stats[2].base_stat}</b>   
                <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[2].base_stat)} now={data.pokemon.stats[2].base_stat} />
                <span/><p/><hr/><hr/><hr/><p/><span/>
                <div>Sp. Attack</div>     
                <b>{data.pokemon.stats[3].base_stat}</b>
                <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[3].base_stat)} now={data.pokemon.stats[3].base_stat} />
                <span/><p/><hr/><hr/><hr/><p/><span/>
                <div>Sp. Def</div>    
                <b>{data.pokemon.stats[4].base_stat}</b>   
                <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[4].base_stat)} now={data.pokemon.stats[4].base_stat} />
                <span/><p/><hr/><hr/><hr/><p/><span/>
                <div>Speed</div>      
                <b>{data.pokemon.stats[5].base_stat}</b>   
                <ProgressBar className={'progressbar'} variant={defineVariant(data.pokemon.stats[5].base_stat)} now={data.pokemon.stats[5].base_stat} />
                <span/><p/><hr/><hr/><hr/><p/><span/>
            </div>

        </div>
    )

}

export default PokemonInfo;