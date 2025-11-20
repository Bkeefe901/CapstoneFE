import style from './EditRow.module.css';
import { useAuth } from '../../context/authContext/authContext';
import axios from 'axios';

export default function EditRow({ edit, setEdit, setTable }) {
    const { cookies } = useAuth();
    let token = cookies.token;
    let options = { headers: { "x-auth-token": token } };
    const name = edit.name;
    const watered = new Date(edit.lastWatered).toISOString().split("T")[0];
    const fed = new Date(edit.lastFed).toISOString().split("T")[0];
    const planted = new Date(edit.datePlanted).toISOString().split("T")[0];




    function handleClick(e) {
        // e.preventDefault();
        setEdit({ ...edit, [e.target.name]: new Date() });
    }


    async function handleDelete(e) {
        // Confirmation pop-up to confirm delete request to userplant collection
        const userConfirmed = confirm("Are you sure you want to delete this plant from your garden?");
        if (userConfirmed) {
            try {
                await axios.delete(`https://garden-tracker-0rj8.onrender.com/api/userplant/${edit._id}`, options);
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




    async function handleSave(e) {
        e.preventDefault();
        try {
            let updatedPlant = {
                name: edit.name,
                lastWatered: edit.lastWatered,
                lastFed: edit.lastFed,
                datePlanted: edit.datePlanted,
            }
            await axios.put(`https://garden-tracker-0rj8.onrender.com/api/userplant/${edit._id}`, updatedPlant, options);
            setTable((prev) => !prev);
            setEdit({ type: "" });

        } catch (err) {
            console.error(err.message);
        }

    }


    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="date"
                    name='datePlanted'
                    value={planted}
                    onChange={handleChange}
                />
            </td>
            <td>
                <div style={{ width: '100%' }}>
                    <input
                        type="date"
                        name='lastFed'
                        value={fed}
                        onChange={handleChange}
                    />
                    <button
                        type='button'
                        name='lastFed'
                        onClick={handleClick}
                        className={style.todayBtn}
                    >
                        today
                    </button>
                </div>
            </td>
            <td>
                <div style={{ width: '100%' }}>
                    <input
                        type="date"
                        name='lastWatered'
                        value={watered}
                        onChange={handleChange}
                    />
                    <button
                        type='button'
                        name='lastWatered'
                        onClick={handleClick}
                        className={style.todayBtn}
                    >
                        today
                    </button>
                </div>
            </td>
            <td>
                <button
                    type='button'
                    className={style.editBtn}
                    onClick={handleSave}
                >
                    Save
                </button>
                <button
                    type='button'
                    className={style.editBtn}
                    onClick={handleDelete}
                    style={{ backgroundColor: 'red' }}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}