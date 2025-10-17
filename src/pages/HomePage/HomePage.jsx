import style from './Home.module.css';


export default function HomePage() {



    return (
        <>
            <header className={style.header}>The Garden Tracker</header>
            <div className="heroImg">
                <img src="https://jacquespepinart.com/wp-content/uploads/2023/02/Caravaggio-Still-Life-with-Fruit.png" alt="Still Life" />
            </div>
            <div className={style.InfoContainer}>
                <p>The Garden Tracker is a simple yet powerful garden management app designed to help you stay on top of your plants care. It allows you to easily track watering and feeding schedules, record when each plant was planted, and monitor their growth over time. With a clean, intuitive interface, you can manage your entire garden from one place—whether you’re caring for a few houseplants or a full outdoor plot.</p>

                <p>Beyond tracking, GardenTrack includes a detailed plant database filled with useful information about each species, including feeding frequency, light requirements, and ideal growing conditions. Whether you’re a beginner gardener or an experienced grower, the app helps you understand your plants better and build healthier, more thriving gardens.</p>
                <br />
                <h3>Helpful Resources</h3>
                <ul style={{listStyle: 'none'}}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                </ul>
            </div>

        </>
    );
}