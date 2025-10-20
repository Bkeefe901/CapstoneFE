import style from './Dash.module.css';
import { useState } from 'react';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import { useEffect } from 'react';
import axios from 'axios';


export default function Dashboard() {
    const [plantData, setPlantData] = useState(null);
    const [addNew, setAddNew] = useState(false);
    const [table, setTable] = useState(false); //Toggle for dependency to useEffect
    const { user } = useUser();
    const { cookies } = useAuth();
    const connStr = `http://localhost:3000/api`;





    useEffect(() => {
        let isMounted = true;
        let controller = new AbortController();
        let token = cookies.token;
        let options = { headers: { "x-auth-token": token } };
        if (user) {
            async function getPlants() {
                try {
                    let res = await axios.get(`${connStr}/userplant/user/${user._id}`, { ...options, signal: controller.signal });
                    if (isMounted) {
                        setPlantData(res.data);
                    }

                } catch (err) {
                    console.error(`❌ Error fetching userPlants: ${err.message}`);
                }
            }
            getPlants();
        };

        return () => {
            isMounted = false;
            controller.abort();
        };

    }, [user, table]);


    function loaded() {
        return <PlantTable plantData={plantData} setAddNew={setAddNew} addNew={addNew} setTable={setTable} />
    }

    function loading() {
        return <h1>Loading</h1>
    }






    return plantData ? loaded() : loading();
}

// Components ---------------------------

function PlantTable({ plantData, setAddNew, addNew, setTable }) {




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
            {addNew ? <PlantInput setAddNew={setAddNew} setTable={setTable} /> : <button onClick={() => { setAddNew((prev) => !prev) }}>Add New Plant</button>}
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

function PlantInput({ setAddNew, setTable }) {
    const { user } = useUser();
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
    const [newPlant, setNewPlant] = useState({
        user: user._id,
        name: "",
        season: "winter",
        datePlanted: new Date(),
        lastWatered: new Date(),
        lastFed: new Date(),
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/userplant`, newPlant, options);
            setAddNew((prev) => !prev);
            setTable((prev) => !prev);

        } catch (err) {
            console.error(err.message);
        }
    }


    function handleChange(e) {
        setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
    }



    return (
        <div className={style.plantInput} >
            <form onSubmit={handleSubmit}>
                <label>
                    Name of Plant
                    <input
                        type="text"
                        name="name"
                        value={newPlant.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Date Planted
                    <input
                        type="date"
                        name='datePlanted'
                        value={newPlant.datePlanted}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Fertalized
                    <input
                        type="date"
                        name='lastFed'
                        value={newPlant.lastFed}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Watered
                    <input
                        type="date"
                        name='lastWatered'
                        value={newPlant.lastWatered}
                        onChange={handleChange}
                    />
                </label>
                <label>For which season?</label>
                <select name="season" id=""  onChange={handleChange}>
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="fall">Fall</option>
                </select>
                <input type="submit" value="Add to Garden" />
            </form>
        </div>
    )
}

