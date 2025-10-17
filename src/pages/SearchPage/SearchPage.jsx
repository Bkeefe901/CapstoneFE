import style from './Search.module.css';


export default function SearchPage() {

    let testData = [
        {
            "_id": {
                "$oid": "68efebb4e7b62067b6d6bca2"
            },
            "name": "purple carrot",
            "feedingFrequency": "two weeks",
            "sunlightReqs": "full",
            "daysToHarvest": 75,
            "description": "A vibrant heirloom carrot with deep purple skin and a sweet, earthy flavor. Thrives in loose, well-drained soil and requires consistent watering for best growth.",
            "imageURL": "https://growhoss.com/cdn/shop/products/Purple-Sun-Carrot.jpg"
        },
        {
            "_id": {
                "$oid": "68efebb4e7b62067b6d6bca3"
            },
            "name": "basil",
            "feedingFrequency": "two weeks",
            "sunlightReqs": "full",
            "daysToHarvest": 60,
            "description": "A fragrant herb popular in Mediterranean cooking. Prefers warm temperatures, rich soil, and at least six hours of direct sunlight per day.",
            "imageURL": "https://cloversgarden.com/cdn/shop/products/sweet-basil-herb-plant-cloversgarden-400_400x400.png"
        },
        {
            "_id": {
                "$oid": "68efebb4e7b62067b6d6bca4"
            },
            "name": "romaine lettuce",
            "feedingFrequency": "two weeks",
            "sunlightReqs": "partial",
            "daysToHarvest": 70,
            "description": "A crisp, leafy green with tall heads and mild flavor. Best grown in cool weather with consistent moisture to prevent bolting.",
            "imageURL": "https://chive.com/cdn/shop/files/SEROLE-3.png?v=1738921452&width=1000"
        }
    ]


    function handleSubmit(e) {
        e.preventDefault();
    }

    let plantInfo = testData.map((ob) => {
        return (
            <div className={style.plantCard}>
                <h3>{ob.name}</h3>
                <p>{ob.description}</p>
                <p><b>Sun light Requirements:</b> {ob.sunlightReqs}</p>
                <p><b>Days to Harvest:</b> {ob.daysToHarvest}</p>
            </div>
        )
    })





    return (
        <>
            <div className={style.mainContainer}>
                <div className={style.searchForm}>
                    <h2>Plant Search</h2>
                    <form onSubmit={handleSubmit} >
                        <label>
                            Plant Name
                            <input type="text" placeholder='Ex: tomato' />
                        </label>
                        <label>
                            Season
                            <input type="text" placeholder='Ex: spring' />
                        </label>
                        <input type="submit" value="Search" />
                    </form>
                </div>
                {plantInfo}
            </div>
        </>
    );
}