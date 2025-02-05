import { useContext, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const UseRecoveryPassCode = () => {
    const { authUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { recoverPassCode } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [repeatedNewPass, setRepeatedNewPass] = useState('');

    const [loading, setLoading] = useState(false);

    const handleUseRecoveryPassCode = async (e) => {
        try {
            e.preventDefault();

            if (newPassword !== repeatedNewPass) {
                throw new Error('Passwords do not match.');
            }

            setLoading(true);

            const res = await fetch(
                `${VITE_API_URL}/api/users/password/reset/${recoverPassCode}`,
                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        newPassword,
                        repeatedNewPass,
                    }),
                }
            );

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            toast.success(body.message, {
                id: 'useRecoveryPass',
            });

            navigate('/login');
        } catch (err) {
            toast.error(err.message, {
                id: 'useRecoveryPass',
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
            <h2>Change Password</h2>

            <form
                onSubmit={handleUseRecoveryPassCode}
                className="recoverPassForm"
            >
                <label htmlFor="Pass">New password:</label>
                <input
                    type="password"
                    id="pass"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    autoFocus
                    required
                />

                <label htmlFor="repatedPass">Confirm Password:</label>
                <input
                    type="password"
                    id="pass"
                    value={repeatedNewPass}
                    onChange={(e) => setRepeatedNewPass(e.target.value)}
                    autoComplete="new-password"
                    required
                />

                <button disabled={loading} className="recoverpassbtn">
                    Change
                </button>
            </form>
        </main>
    );
};

export default UseRecoveryPassCode;
