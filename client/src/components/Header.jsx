import { useState } from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../assets/user.png';
import addUser from '../assets/add-user.png';
import logoutIcon from '../assets/log-out.png';
import useAuthContext from '../hooks/useAuthContext';
import profileIcon from '../assets/profile.png';

const Header = () => {
    const [leftSidebarToggle, setLeftSidebarToggle] = useState(false);
    const [rightSidebarToggle, setRightSidebarToggle] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { authUser, authLogoutState } = useAuthContext();

    const toggleLeftSidebar = () => {
        setLeftSidebarToggle(!leftSidebarToggle);
    };

    const toggleRightSidebar = () => {
        setRightSidebarToggle(!rightSidebarToggle);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Searching for: ', searchQuery);
        // TODO search logic/query w.e
    };

    return (
        <div className="header-container">
            <header className="header">
                <button className="sidebar-toggle" onClick={toggleLeftSidebar}>
                    ☰
                </button>

                <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <h1>
                        <p>Pet</p> <p className="hub">hub</p>
                    </h1>
                </Link>

                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        className="searchbar"
                        placeholder="🔎 Search Pethub..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </form>

                <button className="profile-button" onClick={toggleRightSidebar}>
                    <img src={userIcon} alt="" />
                </button>
            </header>

            <div
                className={`left-sidebar sidebar ${leftSidebarToggle ? 'open' : ''}`}
            >
                <ul>
                    <li>Cats</li>
                    <li>Dogs</li>
                    <li>Categories</li>
                </ul>
            </div>

            <div
                className={`right-sidebar sidebar ${rightSidebarToggle ? 'open' : ''}`}
            >
                <ul className="sidebar-content">
                    {authUser ? (
                        <>
                            <Link
                                to="/users/profile"
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <li>
                                    <img
                                        src={profileIcon}
                                        alt=""
                                        className="sidebar-btn"
                                    />
                                    <p>My profile</p>
                                </li>
                            </Link>
                            <li onClick={authLogoutState}>
                                <img
                                    src={logoutIcon}
                                    alt=""
                                    className="sidebar-btn"
                                    onClick={authLogoutState}
                                />
                                <p>Log out</p>
                            </li>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <li>
                                    <img
                                        src={addUser}
                                        alt=""
                                        className="sidebar-btn"
                                    />
                                    <p>Sign up!</p>
                                </li>
                            </Link>

                            <li>
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <img
                                        src={profileIcon}
                                        alt=""
                                        className="sidebar-btn"
                                    />
                                    <p>Log in</p>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
