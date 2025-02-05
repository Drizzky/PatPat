import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const SendRecoverPassPage = () => {
    const { authUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendRecoveryPassCode = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const res = await fetch(
                `${VITE_API_URL}/api/users/password/reset`,
                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                    }),
                }
            );

            const body = await res.json();
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            toast.success(body.message, {
                id: 'sendRecoverPass',
            });

            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'sendRecoverPass',
            });
        } finally {
            setLoading(false);
        }
    };

    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main className="recoverPassMain">
            <h2 style={{ paddingLeft: '20px' }}>Lost Password?</h2>
            <p style={{ fontWeight: 'bold', paddingLeft: '20px' }}>
                Please enter your email which you first registered with.
            </p>
            <form
                onSubmit={handleSendRecoveryPassCode}
                className="recoverPassForm"
            >
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="new-password"
                    autoFocus
                    required
                />

                <button className="recoverpassbtn" disabled={loading}>
                    Send
                </button>
            </form>
        </main>
    );
};

export default SendRecoverPassPage;
