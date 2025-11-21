import style from './PlantTable.module.css';
import { useUser } from '../../context/userContext/userContext';

// Components
import PlantInput from '../PlantInput/PlantInput';
import EditRow from '../EditRow/EditRow';



export default function PlantTable({ plantData, setAddNew, addNew, setTable, edit, setEdit }) {
    const { user } = useUser();



    let tableData = plantData.map((plant, i) => {
        let now = new Date();
        let planted = new Date(plant.datePlanted);
        let ageDiff = now - planted;    // Finds diff between dates (datePlanted and now)
        let age = Math.floor(ageDiff / (1000 * 60 * 60 * 24));  // rounds and converts to days
        let watered = new Date(plant.lastWatered);
        let waterDifference = now - watered;
        let sinceWater = Math.floor(waterDifference / (1000 * 60 * 60 * 24)); // same for watered
        let fed = new Date(plant.lastFed);
        let feedingDiff = now - fed;
        let sinceFed = Math.floor(feedingDiff / (1000 * 60 * 60 * 24)); // same for fed

        // handler to display the PlantCard (edit form) and carry information about the plant
        function handleClick() {
            setEdit({ ...edit, type: "edit", ...plant });
        }

        let colorCodeWater = '';
        let colorCodeFed = '';


        // conditonal statements to set style color for text of 'sinceWatered' and 'sinceFed' table data
        if (sinceWater > 2 && sinceWater <= 4) {
            colorCodeWater = 'orange';
        }
        if (sinceWater > 4) {
            colorCodeWater = 'red';
        }

        let daysToFeed = plant.feedingFrequency - sinceFed;

        if (daysToFeed >= 2 && daysToFeed <= 4) {
            colorCodeFed = 'orange';
        }

        if (daysToFeed < 2) {
            colorCodeFed = 'red';
        }





        return (edit.type == 'edit') && (edit._id == plant._id) ?
            <EditRow edit={edit} setEdit={setEdit} setTable={setTable} />
            : 
            (
                <tr key={i}>
                    <td>{plant.name}</td>
                    <td>{age} days</td>
                    <td
                        style={{ color: colorCodeFed }}
                    >
                        {sinceFed} days ago
                    </td>
                    <td
                        style={{ color: colorCodeWater }}
                    >
                        {sinceWater} days ago
                    </td>
                    <td>
                        <button
                            onClick={handleClick}
                            className={style.editBtn}
                        >Edit</button>
                    </td>
                </tr>

            );
    });



    return (
        <div className={style.mainContainer}>
            <h1 style={{ marginTop: '80px', marginBottom: '0' }}>Welcome to Your Dashboard {user.userName.toUpperCase()}</h1>
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
            </div>
            {addNew ? <PlantInput setAddNew={setAddNew} setTable={setTable} /> : <button onClick={() => { setAddNew((prev) => !prev) }} className={style.addNew}>Add New Plant</button>}
        </div>
    )
}