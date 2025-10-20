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
    const [edit, setEdit] = useState({ type: "", id: "", name: "" });
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
        return <PlantTable plantData={plantData} setAddNew={setAddNew} addNew={addNew} setTable={setTable} edit={edit} setEdit={setEdit} />
    }

    function loading() {
        return <h1>Loading</h1>
    }






    return plantData ? loaded() : loading();
}

// Components ---------------------------

function PlantTable({ plantData, setAddNew, addNew, setTable, edit, setEdit }) {




    let tableData = plantData.map((plant, i) => {
        let now = new Date();
        let planted = new Date(plant.datePlanted);
        let ageDiff = now - planted;    // Finds diff between dates (datePlanted and now)
        let age = Math.round(ageDiff / (1000 * 60 * 60 * 24));  // rounds and converts to days
        let watered = new Date(plant.lastWatered);
        let waterDifference = now - watered;
        let sinceWater = Math.round(waterDifference / (1000 * 60 * 60 * 24)); // same for watered
        let fed = new Date(plant.lastFed);
        let feedingDiff = now - fed;
        let sinceFed = Math.round(feedingDiff / (1000 * 60 * 60 * 24)); // same for fed

        function handleClick() {
            setEdit({ ...edit, type: "edit", ...plant });
        }

        return (
            <>
                <tr key={i}>
                    <td>{plant.name}</td>
                    <td>{age} days</td>
                    <td>{sinceFed} days ago</td>
                    <td>{sinceWater} days ago</td>
                    <td>
                        <button
                            onClick={handleClick}
                        >Edit</button>
                    </td>
                </tr>
            </>
        );
    });



    return (
        <div className={style.mainContainer}>
            <div className={style.secondContainer}>
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
                {edit.type == 'edit' ? <PlantCard edit={edit} setEdit={setEdit} setTable={setTable} /> : <p></p>}
            </div>
            {addNew ? <PlantInput setAddNew={setAddNew} setTable={setTable} /> : <button onClick={() => { setAddNew((prev) => !prev) }}>Add New Plant</button>}
        </div>
    )
}







function PlantCard({ edit, setEdit, setTable }) {
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
    const watered = new Date(edit.lastWatered).toISOString().split("T")[0];
    const fed = new Date(edit.lastFed).toISOString().split("T")[0];



    function handleClick(e) {
        e.preventDefault();
        setEdit({ ...edit, [e.target.name]: new Date() })

    }

    async function handleDelete(e) {
        e.preventDefault();
        const userConfirmed = confirm("Are you sure you want to delete this plant from your garden?");
        if (userConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/userplant/${edit._id}`, options);
                setTable((prev) => !prev);
                setEdit({ type: "" });

            } catch (err) {
                console.error(err.message);
            }
        }


    }

    function handleChange(e) {
        setEdit({ ...edit, [e.target.name]: e.target.value });
    }

    function handleClose() {
        setEdit({ ...edit, type: "" });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let updatedPlant = {
                lastWatered: edit.lastWatered,
                lastFed: edit.lastFed,
            }
            await axios.put(`http://localhost:3000/api/userplant/${edit._id}`, updatedPlant, options);
            setTable((prev) => !prev);
            setEdit({ type: "" });

        } catch (err) {
            console.error(err.message);
        }
    }


    // console.log(typeof watered);


    return (
        <>
            <form style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--table)', marginTop: '15%', padding: '10px' }} onSubmit={handleSubmit}>
                <button
                    type='button'
                    onClick={handleClose}
                    style={{ marginRight: '90%' }}
                >
                    X
                </button>
                <h1 style={{ marginBottom: '2px' }}>{edit.name}</h1>
                <button
                    style={{ marginBottom: '18px', backgroundColor: 'red' }}
                    onClick={handleDelete}
                >
                    Delete Plant</button>
                <label>
                    Last Watered
                    <input
                        type="date"
                        name='lastWatered'
                        value={watered}
                        onChange={handleChange} />
                </label>
                <button onClick={handleClick} name='lastWatered' >Watered Today</button>
                <label>
                    Last Fertalized
                    <input
                        type="date"
                        name="lastFed"
                        value={fed}
                        onChange={handleChange} />
                </label>
                <button onClick={handleClick} name='lastFed'>Fertalized Today</button>
                <input type="submit" value="Save" onSubmit={handleSubmit} />

            </form>
        </>
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

    function handleClick() {
        setAddNew(false);
    }



    return (
        <div className={style.plantInput} >
            <button
                type='button'
                onClick={handleClick}
                style={{ marginRight: '90%' }}
            >
                X
            </button>
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
                <select name="season" id="" onChange={handleChange}>
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

