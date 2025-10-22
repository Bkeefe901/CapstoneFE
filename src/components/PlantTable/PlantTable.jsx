import style from './PlantTable.module.css';
import { useUser } from '../../context/userContext/userContext';

// Components
import PlantInput from '../PlantInput/PlantInput';
import PlantCard from '../PlantCard/PlantCard';



export default function PlantTable({ plantData, setAddNew, addNew, setTable, edit, setEdit }) {
    const { user } = useUser();



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

        // handler to display the PlantCard (edit form)
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
            <h1 style={{marginTop: '30px', marginBottom: '0'}}>Welcome to Your Dashboard {user.userName}</h1>
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