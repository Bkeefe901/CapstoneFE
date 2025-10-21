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