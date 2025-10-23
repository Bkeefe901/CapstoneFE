import style from './PlantCard.module.css';
import { useAuth } from '../../context/authContext/authContext';
import axios from 'axios';



export default function PlantCard({ edit, setEdit, setTable }) {
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
    const watered = new Date(edit.lastWatered).toISOString().split("T")[0];
    const fed = new Date(edit.lastFed).toISOString().split("T")[0];
    const planted = new Date(edit.datePlanted).toISOString().split("T")[0];



    function handleClick(e) {
        e.preventDefault();
        setEdit({ ...edit, [e.target.name]: new Date() })

    }

    async function handleDelete(e) {
        e.preventDefault();

        // Confirmation pop-up to confirm delete request to userplant collection
        const userConfirmed = confirm("Are you sure you want to delete this plant from your garden?");
        if (userConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/userplant/${edit._id}`, options);
                setTable((prev) => !prev); // toggle for dependency array (useEffect) to refetch userplant data
                setEdit({ type: "" }); // For ternary to display plant card or not on dashboard

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
                datePlanted: edit.datePlanted,
            }
            await axios.put(`http://localhost:3000/api/userplant/${edit._id}`, updatedPlant, options);
            setTable((prev) => !prev);
            setEdit({ type: "" });

        } catch (err) {
            console.error(err.message);
        }
    }



    return (
        <>
            <form className={style.plantCard} onSubmit={handleSubmit}>
                <button
                    type='button'
                    onClick={handleClose}
                    className={style.x}

                >
                    X
                </button>
                <h1 style={{ marginBottom: '2px' }}>{edit.name}</h1>
                <button
                    style={{ marginBottom: '18px', backgroundColor: 'red' }}
                    onClick={handleDelete}
                    className={style.plantCardBtn}
                >
                    Delete Plant</button>
                <label>
                    Date Planted
                    <input 
                        type="date" 
                        name='datePlanted'
                        value={planted}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Watered
                    <input
                        type="date"
                        name='lastWatered'
                        value={watered}
                        onChange={handleChange} 
                    />
                </label>
                <button onClick={handleClick} className={style.plantCardBtn} name='lastWatered' >Watered Today</button>
                <label>
                    Last Fertalized
                    <input
                        type="date"
                        name="lastFed"
                        value={fed}
                        onChange={handleChange} 
                    />
                </label>
                <button onClick={handleClick} className={style.plantCardBtn} name='lastFed'>Fertalized Today</button>
                <input type="submit" value="Save" style={{ lineHeight: '10px' }} onSubmit={handleSubmit} />

            </form>
        </>
    )
}