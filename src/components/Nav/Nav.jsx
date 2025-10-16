import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext/authContext";
import { useUser } from "../../context/userContext/userContext";
import style from './Nav.module.css';

export default function Nav() {
    const { user } = useUser();
    const { logout } = useAuth();

    function handleLogout() {
        logout();
    }

    return (
        <nav className={style.nav}>
            <Link to={"/"}>
                <h3>Home</h3>
            </Link>

            {user ? (
                <>
                    <Link to={"/dash"}>
                        <h3>Dashboard</h3>
                    </Link>
                    {" "}
                    <a>
                        <h3 onClick={handleLogout}>Logout</h3>
                    </a>
                </>
            ) : (
                <>
                    <Link to={"/search"}>
                        <h3>Search Page</h3>
                    </Link>
                    <Link to={"/auth"}>
                        <h3>Login/SignUp</h3>
                    </Link>
                </>
            )}
        </nav>
    );
}
