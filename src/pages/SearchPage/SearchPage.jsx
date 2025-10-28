import { useState } from 'react';
import { useUser } from '../../context/userContext/userContext';
import { useEffect } from 'react';
import axios from 'axios';

// Components
import PlantInfo from '../../components/PlantInfo/PlantInfo';
import AdminForm from '../../components/AdminForm/AdminForm';
import SearchForm from '../../components/SearchForm/SearchForm';


export default function SearchPage() {
    const connStr = `https://garden-tracker-0rj8.onrender.com/api`;
    const [plants, setPlants] = useState(null);
    const [newList, setNewList] = useState(false);
    const { user } = useUser();

    // hook to auto populate the search page with plant data
    useEffect(() => {
        let isMounted = true;
        let controller = new AbortController(); // controller for cleanup function incase component unmounts

        async function getPlants() {
            try {
                let res = await axios.get(`${connStr}/plant`, { signal: controller.signal });
                let data = res.data;
                // data.length = 10;
                if (isMounted) {
                    setPlants(data);
                }


            } catch (err) {
                console.error(`❌ Error fetching plants data`);
            }
        }

        getPlants();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [newList]);




    function loaded() {
        return (
            <>
                {/* ternary to show AdminForm if admin or SearchForm if not */}
                {user?.isAdmin ? <AdminForm plants={plants} setPlants={setPlants} setNewList={setNewList} /> : <SearchForm plants={plants} setPlants={setPlants} setNewList={setNewList} />}
                <PlantInfo plants={plants} setNewList={setNewList} />

            </>
        )
    }

    function loading() {
        return <h1>Loading</h1>
    }

    return plants ? loaded() : loading();
}



