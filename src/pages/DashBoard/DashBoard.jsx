import { useState } from 'react';
import { useUser } from '../../context/userContext/userContext';
import { useAuth } from '../../context/authContext/authContext';
import { useEffect } from 'react';
import axios from 'axios';

//Components
import PlantTable from '../../components/PlantTable/PlantTable';


export default function Dashboard() {
    const [plantData, setPlantData] = useState(null);
    const [addNew, setAddNew] = useState(false);
    const [table, setTable] = useState(false); //Toggle for dependency to useEffect
    const [edit, setEdit] = useState({ type: "", id: "", name: "" });
    const { user } = useUser();
    const { cookies } = useAuth();
    const connStr = `http://localhost:3000/api`;


    // hook to auto populate the dashboard table with the userplant data
    useEffect(() => {
        let isMounted = true;
        let controller = new AbortController(); // controller for cleanup function incase component unmounts
        let token = cookies.token;
        let options = { headers: { "x-auth-token": token } };
        if (user) {
            async function getPlants() {
                try {
                    let res = await axios.get(`${connStr}/userplant/user/${user._id}`, { ...options, signal: controller.signal });
                    if (isMounted) {
                        setPlantData(res.data);
                    }

                } catch (err) {
                    console.error(`❌ Error fetching userPlants: ${err.message}`);
                }
            }
            getPlants();
        };

        return () => {
            isMounted = false;
            controller.abort();
        };

    }, [user, table]);


    function loaded() {
        return <PlantTable plantData={plantData} setAddNew={setAddNew} addNew={addNew} setTable={setTable} edit={edit} setEdit={setEdit} />
    }

    function loading() {
        return <h1>Loading</h1>
    }



    return plantData ? loaded() : loading();
}

