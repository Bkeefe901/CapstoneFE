import style from './PlantInfo.module.css';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import axios from 'axios';



export default function PlantInfo({ plants }) {
    const { user } = useUser();
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
    

    async function handleClick(ob) {
        const plantToAdd = {
            user: user._id,
            plantId: ob._id,
            name: ob.name,
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
    


    let plantInfo = plants.map((ob, i) => {
        return (
            <div key={i} className={style.plantCard}>
                <h3>{ob.name}</h3>
                <p>{ob.description}</p>
                <p><b>Sun light Requirements:</b> {ob.sunlightReqs}</p>
                <p><b>Days to Harvest:</b> {ob.daysToHarvest}</p>
                <img style={{ width: '40%' }} src={ob.imageURL || null} alt={ob.name} />
                {user ? <button
                    style={{width: '100px', marginLeft: 'auto', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)'}}
                    onClick={() => handleClick(ob)}
                > 
                Add to My Garden
                </button> : <p></p> }
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