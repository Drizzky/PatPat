import { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

const CreatePostPage = () => {
    const { authToken, authUser } = useContext(AuthContext);
    const [petName, setPetName] = useState('');
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const [pets, setPets] = useState([]);
    const [petsLoading, setPetsLoading] = useState(false);

    const navigate = useNavigate();

    // Fetch pets for the user
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

    useEffect(() => {
        if (authUser) {
            fetchPets(authUser.id); // Fetch pets when the component mounts
        }
    }, [authUser]); // Re-fetch when authUser changes

    const handleFileChange = (e) => {
        const image = e.target.files;
        if (image.length > 1) {
            toast.error('Only one image per post.', {
                id: 'newPost',
            });
        } else {
            setImage(image[0]);
        }
    };

    const handleAddPost = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.append('petName', petName);
            formData.append('caption', caption);
            formData.append('image', image);

            setLoading(true);

            const res = await fetch(`${VITE_API_URL}/api/posts`, {
                method: 'post',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            toast.success(body.message, {
                id: 'newPost',
            });

            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'newPost',
            });
        } finally {
            setLoading(false);
        }
    };

    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return (
        <main className="addpostmain">
            <h2>Create Post</h2>
            <form onSubmit={handleAddPost} className="addpostform">
                <label htmlFor="pet">Pet:</label>
                <select
                    id="pet"
                    value={petName}
                    className="petselect"
                    onChange={(e) => setPetName(e.target.value)}
                    required
                >
                    <option>Select Pet</option>
                    {petsLoading ? (
                        <option>Loading pets...</option>
                    ) : (
                        pets.map((pet) => (
                            <option
                                className="selected"
                                key={pet.id}
                                value={pet.name}
                            >
                                {pet.name}
                            </option>
                        ))
                    )}
                </select>

                <label htmlFor="Image">Image:</label>
                <input
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg"
                    required
                />

                <label htmlFor="caption">Caption:</label>
                <textarea
                    id="caption"
                    className="postCaption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                ></textarea>

                <button disabled={loading} className="addpostbtnn">
                    Create Post
                </button>
            </form>
        </main>
    );
};

export default CreatePostPage;
