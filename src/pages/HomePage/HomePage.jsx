import style from './Home.module.css';


export default function HomePage() {



    return (
        <>
            <header className={style.header}>The Garden Tracker</header>
            <div className="heroImg">
                <img className={style.heroImg} src="https://jacquespepinart.com/wp-content/uploads/2023/02/Caravaggio-Still-Life-with-Fruit.png" alt="Still Life" />
            </div>
            <div className={style.InfoContainer}>
                <p>The Garden Tracker is a simple yet powerful garden management app designed to help you stay on top of your plants care. It allows you to easily track watering and feeding schedules, record when each plant was planted, and monitor their growth over time. With a clean, intuitive interface, you can manage your entire garden from one place—whether you’re caring for a few houseplants or a full outdoor plot.</p>

                <p>Beyond tracking, GardenTrack includes a detailed plant database filled with useful information about each species, including feeding frequency, light requirements, and ideal growing conditions. Whether you’re a beginner gardener or an experienced grower, the app helps you understand your plants better and build healthier, more thriving gardens.</p>
                <br />
                
            </div>
            <footer className={style.footer}>
                    <div className={style.footerColumn}>
                        <h3>Helpful Resources</h3>
                        <ul>
                            <li><a href="https://www.epicgardening.com/" target='_blank'>Epic Gardening</a></li>
                            <li><a href="https://goingtoseed.org/" target='_blank'>Going to Seed</a></li>
                            <li><a href=""></a></li>
                            <li><a href=""></a></li>
                            <li><a href=""></a></li>
                            <li><a href=""></a></li>
                        </ul>
                    </div>
                    <div className={style.footerColumn}>
                        <h3>Contact</h3>
                        <ul>
                            <li><a href="https://mail.google.com/mail/?view=cm&to=bradyjokeefe@gmail.com" target='_blank'>Email</a></li>
                            <li><a href="https://www.linkedin.com/in/brady-keefe901/" target='_blank'>LinkedIn</a></li>
                        </ul>
                    </div>
                </footer>

        </>
    );
}