import style from './AdminForm.module.css';
import { useState } from 'react';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import axios from 'axios';

// Components
import SearchForm from '../SearchForm/SearchForm';

// AdminForm to add new plants to DB
export default function AdminForm({ setNewList, plants, setPlants }) {
    const { user } = useUser();
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
    const [toggle, setToggle] = useState(false); // Toggle for switching between SearchForm and AdminForm
    const [newPlant, setNewPlant] = useState({
        id: user._id,
        name: "",
        feedingFrequency: "",
        sunlightReqs: "full",
        daysToHarvest: "",
        description: "",
        imageURL: "",
    });


    // handler for creating a new plant in the db
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log(options);
            await axios.post(`https://garden-tracker-0rj8.onrender.com/api/plant`, newPlant, options);
            alert(`✅ Plant successfully added to the database!`);
            setNewList((prev) => !prev); // refetches plant data to display after adding new plant (on SearchPage useEffect dependency)

            //clear form when submitting
            setNewPlant({
                id: user._id,
                name: "",
                feedingFrequency: "",
                sunlightReqs: "full",
                daysToHarvest: "",
                description: "",
                imageURL: "",
            });
        } catch (err) {
            console.error(err.message);
            alert(`❌ There was an error adding the plant. Please try again.`);
        }
    }

    function handleChange(e) {
        setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
    }

    function handleClick() {
        setToggle((prev) => !prev);
    }


    return (

        <div className={style.adminDiv}>
            <button
                onClick={handleClick}
                className={style.toggle}
            >
                Admin Form Toggle
            </button>
            {toggle ?
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
                        Image Path
                        <input
                            type="text"
                            name='imageURL'
                            value={newPlant.imageURL}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Sunlight Requirments</label>
                    <select
                        name="sunlightReqs"
                        value={newPlant.sunlightReqs}
                        onChange={handleChange}
                        className={style.select}
                    >
                        <option value="">Full</option>
                        <option value="">Partial</option>
                        <option value="">Shade</option>
                    </select>
                    <label>
                        Description
                        <textarea
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
                        style={{ width: '130px', lineHeight: '10px' }}
                    />
                </form>}
        </div>

    )
}