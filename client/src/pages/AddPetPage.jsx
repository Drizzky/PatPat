import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

const AddPetPage = () => {
    const navigate = useNavigate();
    const { authUser, authToken } = useAuthContext();

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        breed: '',
        color: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            if (!authToken) {
                toast.error('Must be logged in to add a pet.');
                setLoading(false);
                return;
            }

            const petData = new FormData();
            Object.keys(formData).forEach((key) => {
                petData.append(key, formData[key]);
            });

            petData.append('userId', authUser.id);

            const res = await fetch(`${VITE_API_URL}/api/pets/addpet`, {
                method: 'POST',
                headers: {
                    Authorization: authToken,
                },
                body: petData,
            });

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            toast.success('Pet added successfully!');
            setFormData({
                name: '',
                type: '',
                breed: '',
                color: '',
            });

            navigate('/users/profile');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="add-pet">
            <h2>Add a New Pet</h2>
            <form onSubmit={handleSubmit} className="add-pet-form">
                <input
                    type="text"
                    className="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Pet Name"
                    required
                />
                <input
                    type="text"
                    className="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Type (e.g., Dog, Cat, Spider)"
                    required
                />
                <input
                    type="text"
                    className="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="Breed"
                    required
                />
                <input
                    type="text"
                    className="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Color"
                    required
                />
                <button className="addpetbtn" type="submit" disabled={loading}>
                    {loading ? 'Adding Pet...' : 'Add Pet'}
                </button>
            </form>
        </main>
    );
};

export default AddPetPage;
