import { useEffect, useState } from "react"
import { Dropdown } from 'react-bootstrap'
import DropdownItem from "react-bootstrap/esm/DropdownItem"

const PokemonFilter = ({urlChange}) => {
    
  
    const [dataFilter, setFilter] = useState([]);
    const [TitleName, setTitle] = useState('Filters');

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/type')
          .then(res => {
            return res.json();
          })
          .then(data => {
            setFilter(data.results);
          })
      }, []);
    

      const onClickFilter = (name,url) =>{
        
          setTitle(name);
      }
      

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {TitleName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <DropdownItem onClick={()=>{
                    onClickFilter('All pokemons')
                    urlChange('https://pokeapi.co/api/v2/pokemon')
                }}>All pokemons</DropdownItem>
            {dataFilter.map(filter=>(
                <DropdownItem key={filter.name} onClick={()=>{
                    onClickFilter(filter.name, filter.url)
                    urlChange(filter.url)
                }}>{filter.name}</DropdownItem>
            ))}
            </Dropdown.Menu>
        </Dropdown>
        
    )
}

export default PokemonFilter;