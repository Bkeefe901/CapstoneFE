import style from './Search.module.css';
import { useState } from 'react';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import { useEffect } from 'react';
import axios from 'axios';


export default function SearchPage() {
    const connStr = `http://localhost:3000/api`;
    const [plants, setPlants] = useState(null);
    let testData = [];

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



function PlantList({ plants }) {
    const { user } = useUser();
    const { cookies } = useAuth();

    let plantInfo = plants.map((ob) => {
        return (
            <div className={style.plantCard}>
                <h3>{ob.name}</h3>
                <p>{ob.description}</p>
                <p><b>Sun light Requirements:</b> {ob.sunlightReqs}</p>
                <p><b>Days to Harvest:</b> {ob.daysToHarvest}</p>
                <img style={{ width: '40%' }} src={ob.imageURL} alt={ob.name} />
            </div>
        )
    })


    function handleSubmit(e) {
        e.preventDefault();
    }


    return ( // use ternary: user.isAdmin ? <PlantSearch /> : <AdminForm />
        <>
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
                {plantInfo}
            </div>
        </>
    );



}








// AdminForm to add new plants to DB
function AdminForm() {

    // Would like the sulight requirements to be drop down menu with options
    return (
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
        </div>
    )
}




// {
//     "_id": {
//         "$oid": "68efebb4e7b62067b6d6bca2"
//     },
//     "name": "purple carrot",
//     "feedingFrequency": "two weeks",
//     "sunlightReqs": "full",
//     "daysToHarvest": 75,
//     "description": "A vibrant heirloom carrot with deep purple skin and a sweet, earthy flavor. Thrives in loose, well-drained soil and requires consistent watering for best growth.",
//     "imageURL": "https://growhoss.com/cdn/shop/products/Purple-Sun-Carrot.jpg"
// },
// {
//     "_id": {
//         "$oid": "68efebb4e7b62067b6d6bca3"
//     },
//     "name": "basil",
//     "feedingFrequency": "two weeks",
//     "sunlightReqs": "full",
//     "daysToHarvest": 60,
//     "description": "A fragrant herb popular in Mediterranean cooking. Prefers warm temperatures, rich soil, and at least six hours of direct sunlight per day.",
//     "imageURL": "https://cloversgarden.com/cdn/shop/products/sweet-basil-herb-plant-cloversgarden-400_400x400.png"
// },
// {
//     "_id": {
//         "$oid": "68efebb4e7b62067b6d6bca4"
//     },
//     "name": "romaine lettuce",
//     "feedingFrequency": "two weeks",
//     "sunlightReqs": "partial",
//     "daysToHarvest": 70,
//     "description": "A crisp, leafy green with tall heads and mild flavor. Best grown in cool weather with consistent moisture to prevent bolting.",
//     "imageURL": "https://chive.com/cdn/shop/files/SEROLE-3.png?v=1738921452&width=1000"
// }