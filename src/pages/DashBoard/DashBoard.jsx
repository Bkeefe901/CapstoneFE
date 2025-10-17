import style from './Dash.module.css';


export default function Dashboard() {

    let testData = [
        {
            "name": "purple carrot",
            "datePlanted": "2025-03-15T00:00:00.000+00:00",
            "lastFed": "2025-04-10T00:00:00.000+00:00",
            "lastWatered": "2025-04-01T00:00:00.000+00:00"
        },
        {
            "name": "purple carrot",
            "datePlanted": "2025-03-15T00:00:00.000+00:00",
            "lastFed": "2025-04-10T00:00:00.000+00:00",
            "lastWatered": "2025-04-01T00:00:00.000+00:00"
        },
        {
            "name": "purple carrot",
            "datePlanted": "2025-03-15T00:00:00.000+00:00",
            "lastFed": "2025-04-10T00:00:00.000+00:00",
            "lastWatered": "2025-04-01T00:00:00.000+00:00"
        }
    ];

    let tableData = testData.map((plant, i) => {

        let now = new Date();
        let planted = new Date(plant.datePlanted);
        let ageDifference = now - planted;
        let age = Math.round(ageDifference / (1000 * 60 * 60 * 24));

        let watered = new Date(plant.lastWatered);
        let waterDifference = now - watered;
        let sinceWater = Math.round(waterDifference / (1000 * 60 * 60 * 24));



        return (
            <>
                <tr key={i}>
                    <td>{plant.name}</td>
                    <td>{age} days</td>
                    <td></td>
                    <td>{sinceWater} days ago</td>
                    <td><button>Details</button></td>
                </tr>
            </>
        );
    })



    return (
        <div className={style.mainContainer}>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Next Feeding</th>
                        <th>Last Watered</th>
                    </tr>

                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
            <button>Add New Plant</button>
        </div>
    )
}

// Components ---------------------------

    function PlantCard() {

        return (
            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
        )
    }

    function PlantInput() {

        return (
            <div>
                <form>
                    <label>
                        Name of Plant
                        <input type="text" />
                    </label>
                    <label>
                        Date Planted
                        <input type="date" />
                    </label>
                    <label>
                        Last Fertalized
                        <input type="date" />
                    </label>
                    <label>
                        Last Watered 
                        <input type="date" />
                    </label>
                </form>
            </div>
        )
    }
