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
                {user?.isAdmin ? <AdminForm setNewList={setNewList} /> : <SearchForm plants={plants} />} 
                <div className={style.plantList}>
                    <PlantInfo plants={plants} />
                </div>
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
    let plantInfo = plants.map((ob, i) => {
        return (
            <div key={i} className={style.plantCard}>
                <h3>{ob.name}</h3>
                <p>{ob.description}</p>
                <p><b>Sun light Requirements:</b> {ob.sunlightReqs}</p>
                <p><b>Days to Harvest:</b> {ob.daysToHarvest}</p>
                <img style={{ width: '40%' }} src={ob.imageURL} alt={ob.name} />
            </div>
        )
    });

    return (
        <>
            {plantInfo}
        </>
    )

}


// Search Form for nonAdmin users
function SearchForm({ plants }) {
    


    function handleSubmit(e) {
        e.preventDefault();
    }


    return (
        <div className={style.mainContainer}>
            <div className={style.searchForm}>
                <h2>Plant Search</h2>
                <form onSubmit={handleSubmit} >
                    <label>
                        Plant Name
                        <input type="text" placeholder='Ex: tomato' />
                    </label>
                    <input type="submit" value="Search" />
                </form>
            </div>
        </div>
    )
}

// return user?.isAdmin ? <AdminForm plants={plants} /> :
















// AdminForm to add new plants to DB
function AdminForm({ setNewList }) {
    const { user } = useUser();
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
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
        setNewPlant({...newPlant, [e.target.name]: e.target.value});
    }




    return (
    
            <div className={style.searchForm}>
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
                        style={{width: '130px'}}
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
                        style={{height: '65px'}}
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
                        style={{width: '130px'}}        
                        />
                </form>
            </div>
        
    )
}




