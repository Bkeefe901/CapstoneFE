import style from './Search.module.css';
import { useState } from 'react';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import { useEffect } from 'react';
import axios from 'axios';


export default function SearchPage() {
    const connStr = `http://localhost:3000/api`;
    const [plants, setPlants] = useState(null);

    useEffect(() => {
        let isMounted = true;
        let controller = new AbortController();

        async function getPlants() {
            try {
                let res = await axios.get(`${connStr}/plant`, { signal: controller.signal });
                let data = res.data;
                data.length = 10;
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

    }, []);




    function loaded() {
        return <PlantList plants={plants} />
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



function PlantList({ plants }) {
    const { user } = useUser();
    const { cookies } = useAuth();


    function handleSubmit(e) {
        e.preventDefault();
    }


    return user?.isAdmin ? <AdminForm plants={plants} /> :

        <div className={style.mainContainer}>
            <div className={style.searchForm}>
                <h2>Plant Search</h2>
                <form onSubmit={handleSubmit} >
                    <label>
                        Plant Name
                        <input type="text" placeholder='Ex: tomato' />
                    </label>
                    <label>
                        Season
                        <input type="text" placeholder='Ex: spring' />
                    </label>
                    <input type="submit" value="Search" />
                </form>
            </div>
            <PlantInfo plants={plants} />
        </div>





}









// AdminForm to add new plants to DB
function AdminForm({ plants }) {

    // Would like the sulight requirements to be drop down menu with options
    return (
        <div>
            <div>
                <form>
                    <label>
                        Name of Plant
                        <input type="text" />
                    </label>
                    <label>
                        Feeding Frequency In Days
                        <input type="number" />
                    </label>
                    <label>Sunlight Requirments</label>
                    <select name="" id="">
                        <option value="">Full</option>
                        <option value="">Partial</option>
                        <option value="">Shade</option>
                    </select>
                    <label>
                        Days to Harvest
                        <input type="number" />
                    </label>
                    <label>
                        Description
                        <input type="text" />
                    </label>
                    <label>
                        Image URL
                        <input type="text" />
                    </label>
                </form>
                <PlantInfo plants={plants} />
            </div>
        </div>
    )
}




