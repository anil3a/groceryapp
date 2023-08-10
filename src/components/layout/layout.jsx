import { Link } from "react-router-dom";
import Router from "../../router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Auth from "../views/auth";

const Layout = (props) => {

    const onLogout = () => {
        signOut(auth);
    }

    return (
        <div className="page-layout container-fluid main_container vh-100">
            { props.loggedIn ?
                <>
                <header className="d-flex w-100 p-4 d-flex justify-content-center">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={onLogout}>Log out</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <main>
                    <Router />
                </main>
                </>
            : <Auth /> }
            <footer className="navbar fixed-bottom">
                <div className="text-center w-100">Anil Copyright 2023 All rights reserved.</div>
            </footer>
        </div>
    );
}

export default Layout;