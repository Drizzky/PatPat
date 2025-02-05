import { Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import defaultAvatar from '../assets/default-avatar.png';
import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import addPet from '../assets/add-pet.png';
import { Link } from 'react-router-dom';
import defaultPetAvatar from '../assets/defaultPetAvatar.png';

const { VITE_API_URL } = import.meta.env;

const UserProfilePage = () => {
    const { authToken, authUser, authUpdateAvatarState } = useAuthContext();
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pets, setPets] = useState([]);
    const [petsLoading, setPetsLoading] = useState(true);

    useEffect(() => {
        if (authUser && authUser.id) {
            fetchPets(authUser.id);
        }
    }, [authUser]);

    const fetchPets = async (userId) => {
        setPetsLoading(true);
        try {
            const response = await fetch(
                `${VITE_API_URL}/api/pets?userId=${userId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: authToken,
                    },
                }
            );
            const data = await response.json();

            if (data.status === 'ok' && Array.isArray(data.data.pets)) {
                setPets(data.data.pets);
            } else {
                setPets([]);
            }
        } catch (error) {
            console.error('Error fetching pets:', error);
            toast.error('Failed to fetch pets.');
            setPets([]);
        } finally {
            setPetsLoading(false);
        }
    };

    const handleUpdateAvatar = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('avatar', avatar);

            const response = await fetch(`${VITE_API_URL}/api/users/avatar`, {
                method: 'PUT',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            const result = await response.json();

            if (result.status === 'error') {
                throw new Error(result.message);
            }

            authUpdateAvatarState(result.data.user.avatar);
            toast.success('Profile picture updated successfully!');
        } catch (error) {
            toast.error(error.message || 'Failed to update profile picture.');
        } finally {
            setLoading(false);
        }
    };
    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return (
        <main className="profile">
            <h2>My Profile</h2>
            <img
                className="pfp"
                src={
                    authUser.avatar
                        ? `${VITE_API_URL}/${authUser.avatar}`
                        : defaultAvatar
                }
                alt="Profile Avatar"
            />
            <form onSubmit={handleUpdateAvatar} className="pfpForm">
                <input
                    type="file"
                    id="fileInput"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    accept="image/png, image/jpeg"
                    required
                />
                <button disabled={loading} className="profilepfpbtn">
                    {loading ? 'Updating...' : 'Change PFP'}
                </button>
            </form>

            <h3>Account Details</h3>
            <ul className="accountDeets">
                <li>
                    <strong>Username:</strong> {authUser.username}
                </li>
                <li>
                    <strong>Email:</strong> {authUser.email}
                </li>
                <li>
                    <strong>Member Since:</strong>{' '}
                    {moment(authUser.createdAt).format('DD/MM/YY')}
                </li>
            </ul>

            <div className="yourPetHeader">
                <h4>Your Pets</h4>
                <Link to="/pets/addpet">
                    <img className="addPet" src={addPet} alt="Add Pet" />
                </Link>
            </div>

            {petsLoading ? (
                <p>Loading pets...</p>
            ) : pets.length === 0 ? (
                <h4>You do not have any pets yet. Add one!</h4>
            ) : (
                <ul className="petList">
                    {pets.map((pet) => (
                        <li key={pet.id} className="petItem">
                            <img
                                className="petAvatar"
                                src={
                                    pet.avatar
                                        ? `${VITE_API_URL}/${pet.avatar}`
                                        : defaultPetAvatar
                                }
                                alt={`Avatar of ${pet.name}`}
                                style={{
                                    maxWidth: '100px',
                                    maxHeight: '100px',
                                }}
                            />
                            <h5>{pet.name}</h5>
                            <p>{pet.type}</p>
                            <p>{pet.breed}</p>
                            <button>Edit Pet Profile</button>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default UserProfilePage;
