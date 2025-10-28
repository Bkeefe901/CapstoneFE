import style from './PlantInput.module.css';
import { useState } from 'react';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import axios from 'axios';



export default function PlantInput({ setAddNew, setTable }) {
    const { user } = useUser();
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
    let today = new Date().toISOString().split("T")[0];
    const [newPlant, setNewPlant] = useState({
        user: user._id,
        name: "",
        season: "winter",
        datePlanted: today,
        feedingFrequency: 14,
        lastWatered: today,
        lastFed: today,
    });

    // handler to add a new plant to userplant 
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(`https://garden-tracker-0rj8.onrender.com/api/userplant`, newPlant, options);
            setAddNew((prev) => !prev); // for ternary to toggle displaying the plant input form
            setTable((prev) => !prev); // to refresh table (refetch data from userplant collection)

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
            <form className={style.inputForm} onSubmit={handleSubmit}>
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
                    Recomended Feeding Frequency (14 days default)
                    <input
                        type="number"
                        name='feedingFrequency'
                        value={newPlant.feedingFrequency}
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
                <input type="submit" value="Add to Garden" style={{lineHeight: '10px'}} />
            </form>
        </div>
    )
}

