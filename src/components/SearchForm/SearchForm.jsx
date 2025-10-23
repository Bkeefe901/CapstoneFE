import style from './SearchForm.module.css';
import { useState } from 'react';


// Search Form for nonAdmin users
export default function SearchForm({ plants, setPlants, setNewList }) {
    const [search, setSearch] = useState({
        name: ""
    });



    function handleChange(e) {
        setSearch({...search, [e.target.name]: e.target.value.toLowerCase()});
    }

    // handler to filter plant list for a name that matches the search
    function handleSubmit(e) {
        e.preventDefault();
        let updatedPlants = plants.filter((plant) => plant.name == search.name);
        setPlants(updatedPlants);
    }

    // handler to reset plant list and clear search input
    function handleClick() {
        setNewList((prev) => !prev);
        setSearch({ name: "" })
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.searchForm}>
                <h2>Plant Search</h2>
                <form onSubmit={handleSubmit} >
                    <label>
                        Plant Name
                        <input 
                            type="text" 
                            name="name"
                            value={search.name}
                            className={style.input}
                            placeholder='Ex: tomato' 
                            onChange={handleChange}
                            
                            />
                    </label>
                    <input 
                        type="submit" 
                        value="Search" 
                        className={style.submit}
                        onSubmit={handleSubmit}
                        
                        />
                </form>
            </div>
            <button className={style.clearBtn} onClick={handleClick}>Clear Search Results</button>
        </div>
    )
}