import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const ValidateUserPage = () => {
    const { authUser } = useContext(AuthContext);
    const { regCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchValidateUser = async () => {
            try {
                const res = await fetch(
                    `${VITE_API_URL}/api/users/validate/${regCode}`,
                    { method: 'Put' }
                );

                const body = await res.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }
                toast.success(body.message, {
                    id: 'activateUser',
                    duration: 10000,
                });
                navigate('/login');
            } catch (err) {
                toast.error(err.message, {
                    id: 'activateUser',
                });

                navigate('/');
            }
        };
        fetchValidateUser();
    }, [regCode, navigate]);

    if (authUser) {
        return <Navigate to="/" />;
    }
    return <h2>sup niga</h2>;
};

export default ValidateUserPage;
