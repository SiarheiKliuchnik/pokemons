import { useEffect, useState } from "react";
import './PokemonItem.css';


const PokemonItem = ({ name, url }) => {
    const [photo, setPhoto] = useState(null);

    useEffect(()=> {
        fetch(url)
            .then(res => {
            return res.json();
        })
        .then(data => {
            setPhoto(data.sprites.other['official-artwork'].front_default);
            
        })
    });

    return (
        <div>   
            {photo && (<img className={'pokemon-photo'} src={photo} alt={name} />)}
            {photo && (<div className={'pokemon-name'}>{name}</div>)}
        </div>
    )
};

export default PokemonItem;