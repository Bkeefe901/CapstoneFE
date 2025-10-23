import style from './PlantInfo.module.css';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import axios from 'axios';



export default function PlantInfo({ plants, setNewList }) {
    const { user } = useUser();
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };


    // handler to add plant from search page to personal garden
    async function handleClick(ob) {
        
        const plantToAdd = {
            user: user._id,
            plantId: ob._id,
            name: ob.name,
            feedingFrequency: ob.feedingFrequency,
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

    // handler for admin to delete plants from plant collection from search page
    async function handleDelete(ob) {
        const config = {...options, data:{ id: user._id }};
        const userConfirmed = confirm("Are you want to delete this plant from the database?");

        if (userConfirmed) {
            try {
                console.log(options);
                await axios.delete(`http://localhost:3000/api/plant/${ob._id}`, config);
                alert(`✅ Plant has been deleted from database!`);
                setNewList((prev) => !prev); // refreshes plant list

            } catch (err) {
                console.error(err.message);
                alert(`❌ The plant did not successfully get removed from the database. Try again.`)
            }
        }

    }



    let plantInfo = plants.map((ob, i) => {
        return (
            <div key={i} className={style.plantCard}>
                <h1>{ob.name.toUpperCase()}</h1>
                <p>{ob.description}</p>
                <p><b>Sun light Requirements:</b> {ob.sunlightReqs}</p>
                <p><b>Days to Harvest:</b> {ob.daysToHarvest}</p>
                <img className={style.plantImg} src={ob.imageURL || null} alt={ob.name} />
                {user ? <button
                    style={{ width: '100px', marginLeft: 'auto', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)' }}
                    onClick={() => handleClick(ob)}
                >
                    Add to My Garden
                </button> : <p></p>}
                {user?.isAdmin ?
                    <button
                        style={{ marginTop: '15px', backgroundColor: 'red' }}
                        onClick={() => handleDelete(ob)}
                    >
                        Delete
                    </button> : <p></p>}
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