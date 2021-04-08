import { useEffect, useState } from 'react';
import './App.css';
import PokemonItem from './components/PokemonItem/PokemonItem';
import PokemonInfo from './components/PokemonInfo/PokemonInfo';
import PokemonFilter from './components/PokemonFilter/PokemonFilter';
import { Button } from 'react-bootstrap';

function App() {
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [isSinglePokemon, setIsSinglePokemon] = useState(false);
  const [url,setUrl] = useState('');
  const [isShowAll, setIsShowAll] = useState(false);
  


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setIsData(true);
        setPrev(data.previous);
        setNext(data.next);
        setData(data.results);
      })
  }, []);
  
  useEffect(() => {
    fetch(url)
      .then(res => {
        console.log(res)
        return res.json();
      })
      .then(data => {
        let smth = data.pokemon.map(item=>item.pokemon)
        setIsData(true);
        setData(smth)
        setIsShowAll(true)
      })
  }, [url]);
  const onClickNext = () => {
    fetch(next)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setIsData(true);
        setPrev(data.previous);
        setNext(data.next);
        setData(data.results);
        console.log(data.results)
      })
  };

  const onClickPrev = () => {
    fetch(prev)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setIsData(true);
        setPrev(data.previous);
        setNext(data.next);
        setData(data.results);
      })
  };

  const onClickName = (url) => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setSinglePokemon(data);
        setIsSinglePokemon(true);
      })
  }



const urlChange = (newUrl)=>{
  setUrl(newUrl)
}
  return (
    <div className={'main-container'}>
      {/* <div>{isData && (<div>Count: {allPokemon}</div>)}</div>
      <div>{isData && (<div>Next: {next}</div>)}</div>
      <div>{isData && (<div>Prev: {prev}</div>)}</div> */}
      <div className ={'header-container'}>
        <div>
          
        </div>
        <div><PokemonFilter urlChange = {urlChange}/></div>
      </div>
      {isData && (<div className={'pokemon-container'}>
        {data.map(item => 
          <div key={item.name} onClick={() => onClickName(item.url)} className="pokemon-item">
            <PokemonItem name={item.name} url={item.url}/>
          </div>
        )}
      </div>
      )}
      {!isShowAll&&
      <div className={"button-container"}>
        <Button variant="primary" onClick={onClickPrev}>Prev</Button>
        <Button onClick={onClickNext}>Next</Button>
      </div>}
      {isSinglePokemon && (
        <div>
          <div>
            <PokemonInfo pokemon={singlePokemon}/>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
