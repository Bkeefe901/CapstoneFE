import style from './Dash.module.css';
import { useState } from 'react';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import { useEffect } from 'react';
import axios from 'axios';


export default function Dashboard() {
    const [plantData, setPlantData] = useState(null);
    const { user } = useUser();
    const { cookies } = useAuth();
    const connStr = `http://localhost:3000/api`

    let testData = [
        {
            "name": "purple carrot",
            "datePlanted": "2025-03-15T00:00:00.000+00:00",
            "lastFed": "2025-04-10T00:00:00.000+00:00",
            "lastWatered": "2025-04-01T00:00:00.000+00:00"
        },
        {
            "name": "purple carrot",
            "datePlanted": "2025-03-15T00:00:00.000+00:00",
            "lastFed": "2025-04-10T00:00:00.000+00:00",
            "lastWatered": "2025-04-01T00:00:00.000+00:00"
        },
        {
            "name": "purple carrot",
            "datePlanted": "2025-03-15T00:00:00.000+00:00",
            "lastFed": "2025-04-10T00:00:00.000+00:00",
            "lastWatered": "2025-04-01T00:00:00.000+00:00"
        }
    ];

    // console.log(user); // returns this which is a state from useUser context

    // console.log(user._id); // will not recognize _id even though i see it from console logging user state above

    let token = cookies.token;

    console.log(token);

    let options = {
        headers: { "x-auth-token": token },
    };


    useEffect(() => {

        if (user) {
            async function getPlants() {

                try {
                    let res = await axios.get(`${connStr}/userplant/user/${user._id}`, options);

                    setPlantData(res.data);

                } catch (err) {
                    console.error(`❌ Error fetching userPlants: ${err.message}`);
                }
            }
            getPlants();
        }


    }, [user])


    function loaded() {
        return <PlantTable plantData={plantData}/>
    }

    function loading() {
        return <h1>Loading</h1>
    }


    



    return plantData ? loaded() : loading();
}

// Components ---------------------------

function PlantTable({ plantData }){




    let tableData = plantData.map((plant, i) => {
        let now = new Date();
        let planted = new Date(plant.datePlanted);
        let ageDiff = now - planted;
        let age = Math.round(ageDiff / (1000 * 60 * 60 * 24));
        let watered = new Date(plant.lastWatered);
        let waterDifference = now - watered;
        let sinceWater = Math.round(waterDifference / (1000 * 60 * 60 * 24));
        let fed = new Date(plant.lastFed);
        let feedingDiff = now - fed;
        let sinceFed = Math.round(feedingDiff / (1000 * 60 * 60 * 24));
        
        return (
            <>
                <tr key={i}>
                    <td>{plant.name}</td>
                    <td>{age} days</td>
                    <td>{sinceFed} days ago</td>
                    <td>{sinceWater} days ago</td>
                    <td><button>Details</button></td>
                </tr>
            </>
        );
    });



    return (
        <div className={style.mainContainer}>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Last Fertalized</th>
                        <th>Last Watered</th>
                    </tr>

                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
            <button>Add New Plant</button>
        </div>
    )
}

function PlantCard() {

    return (
        <div>
            <ul>
                <li></li>
            </ul>
        </div>
    )
}

function PlantInput() {

    return (
        <div>
            <form>
                <label>
                    Name of Plant
                    <input type="text" />
                </label>
                <label>
                    Date Planted
                    <input type="date" />
                </label>
                <label>
                    Last Fertalized
                    <input type="date" />
                </label>
                <label>
                    Last Watered
                    <input type="date" />
                </label>
            </form>
        </div>
    )
}
