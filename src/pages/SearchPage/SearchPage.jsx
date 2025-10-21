import style from './Search.module.css';
import { useState } from 'react';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import { useEffect } from 'react';
import axios from 'axios';


export default function SearchPage() {
    const connStr = `http://localhost:3000/api`;
    const [plants, setPlants] = useState(null);
    const [newList, setNewList] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        let isMounted = true;
        let controller = new AbortController();

        async function getPlants() {
            try {
                let res = await axios.get(`${connStr}/plant`, { signal: controller.signal });
                let data = res.data;
                // data.length = 10;
                if (isMounted) {
                    setPlants(data);
                }


            } catch (err) {
                console.error(`❌ Error fetching plants data`);
            }
        }

        getPlants();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [newList]);




    function loaded() {
        return (
            <>
                {user?.isAdmin ? <AdminForm plants={plants} setPlants={setPlants} setNewList={setNewList} /> : <SearchForm plants={plants} setPlants={setPlants} setNewList={setNewList} />}
                <PlantInfo plants={plants} />

            </>
        )
    }

    function loading() {
        return <h1>Loading</h1>
    }

    return plants ? loaded() : loading();
}



// Components ---------------------------------------------------------


function PlantInfo({ plants }) {
    const { user } = useUser();
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
    

    async function handleClick(ob) {
        const plantToAdd = {
            user: user._id,
            plantId: ob._id,
            name: ob.name,
            season: "spring",
        }

        try {
            await axios.post(`http://localhost:3000/api/userplant`, plantToAdd, options);
            alert(`✅ Plant has been added to your personal garden!`);
        } catch (err) {
            console.error(err.message);
            alert(`❌ Plant failed to connect to your garden, please try again`);
        }
    }
    


    let plantInfo = plants.map((ob, i) => {
        return (
            <div key={i} className={style.plantCard}>
                <h3>{ob.name}</h3>
                <p>{ob.description}</p>
                <p><b>Sun light Requirements:</b> {ob.sunlightReqs}</p>
                <p><b>Days to Harvest:</b> {ob.daysToHarvest}</p>
                <img style={{ width: '40%' }} src={ob.imageURL || null} alt={ob.name} />
                {user ? <button
                    style={{width: '100px', marginLeft: 'auto', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)'}}
                    onClick={() => handleClick(ob)}
                > 
                Add to My Garden
                </button> : <p></p> }
            </div>
        )
    });

    return (
        <>
            <div className={style.plantList}>
                {plantInfo}
            </div>
        </>
    )

}


// Search Form for nonAdmin users
function SearchForm({ plants, setPlants, setNewList }) {
    const [search, setSearch] = useState({
        name: ""
    });


    function handleChange(e) {
        setSearch({...search, [e.target.name]: e.target.value.toLowerCase()});
    }

    function handleSubmit(e) {
        e.preventDefault();
        let updatedPlants = plants.filter((plant) => plant.name == search.name);
        setPlants(updatedPlants);
    }

    function handleClick(e) {
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
                            placeholder='Ex: tomato' 
                            onChange={handleChange}
                            
                            />
                    </label>
                    <input 
                        type="submit" 
                        value="Search" 
                        onSubmit={handleSubmit}
                        
                        />
                </form>
            </div>
            <button onClick={handleClick}>Clear Search Results</button>
        </div>
    )
}

// return user?.isAdmin ? <AdminForm plants={plants} /> :
















// AdminForm to add new plants to DB
function AdminForm({ setNewList, plants, setPlants }) {
    const { user } = useUser();
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
    const [toggle, setToggle] = useState(false);
    const [newPlant, setNewPlant] = useState({
        id: user._id,
        name: "",
        feedingFrequency: "",
        sunlightReqs: "full",
        daysToHarvest: "",
        description: "",
        imageURL: "",
    });


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/plant`, newPlant, options);
            alert(`✅ Plant successfully added to the database!`);
            setNewList((prev) => !prev);
        } catch (err) {
            console.error(err.message);
            alert(`❌ There was an error adding the plant. Please try again.`);
        }
    }

    function handleChange(e) {
        setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
    }

    function handleClick(e) {
        setToggle((prev) => !prev);
    }




    return (

        <div className={style.adminDiv}>
            <button 
                style={{marginBottom: '10px'}}
                onClick={handleClick}
            >
            Admin Form Toggle
            </button>
            { toggle ?
            <SearchForm plants={plants} setPlants={setPlants} setNewList={setNewList} /> :
            <form className={style.adminForm} onSubmit={handleSubmit}>
                <h1>Admin Plant Form</h1>
                <label>
                    Name of Plant
                    <input
                        type="text"
                        name='name'
                        value={newPlant.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Feeding Frequency In Days
                    <input
                        type="number"
                        name='feedingFrequency'
                        value={newPlant.feedingFrequency}
                        onChange={handleChange}
                    />
                </label>
                <label>Sunlight Requirments</label>
                <select
                    name="sunlightReqs"
                    value={newPlant.sunlightReqs}
                    onChange={handleChange}
                    style={{ width: '130px' }}
                >
                    <option value="">Full</option>
                    <option value="">Partial</option>
                    <option value="">Shade</option>
                </select>
                <label>
                    Days to Harvest
                    <input
                        type="number"
                        name='daysToHarvest'
                        value={newPlant.daysToHarvest}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Image URL
                    <input
                        type="text"
                        name='imageURL'
                        value={newPlant.imageURL}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description
                    <textarea
                        style={{ height: '65px' }}
                        type="text"
                        name='description'
                        rows='8'
                        cols='40'
                        value={newPlant.description}
                        onChange={handleChange}
                    ></textarea>
                </label>
                <input
                    type="submit"
                    style={{ width: '130px' }}
                />
            </form>  }
        </div> 

    )
}




