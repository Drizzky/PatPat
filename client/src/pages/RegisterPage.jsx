import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

const RegisterPage = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    const [formInputs, setFormInputs] = useState({
        username: '',
        email: '',
        password: '',
        repeatedPass: '',
    });

    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            if (formInputs.password !== formInputs.repeatedPass) {
                throw new Error('Passwords must match.');
            }

            setLoading(true);

            const res = await fetch(`${VITE_API_URL}/api/users/register`, {
                method: 'post',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(formInputs),
            });

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            toast.success(body.message, {
                id: 'register',
            });

            navigate('/');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main className="sign-up">
            <h2>Sign up!</h2>
            <form className="registerForm" onSubmit={handleRegister}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={formInputs.username}
                    onChange={(e) =>
                        setFormInputs({
                            ...formInputs,
                            username: e.target.value,
                        })
                    }
                    autoComplete="username"
                    autoFocus
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={formInputs.email}
                    onChange={(e) =>
                        setFormInputs({ ...formInputs, email: e.target.value })
                    }
                    autoComplete="email"
                    required
                />
                <label htmlFor="pass">Password:</label>
                <input
                    type="password"
                    id="pass"
                    value={formInputs.password}
                    onChange={(e) =>
                        setFormInputs({
                            ...formInputs,
                            password: e.target.value,
                        })
                    }
                    autoComplete="new-password"
                    required
                />
                <label htmlFor="repeatedPass">Confirm Password:</label>
                <input
                    type="password"
                    id="repeatedPass"
                    value={formInputs.repeatedPass}
                    onChange={(e) =>
                        setFormInputs({
                            ...formInputs,
                            repeatedPass: e.target.value,
                        })
                    }
                    autoComplete="new-password"
                    required
                />
                <button disabled={loading} className="registerbtn">
                    Register
                </button>
            </form>
        </main>
    );
};

export default RegisterPage;
