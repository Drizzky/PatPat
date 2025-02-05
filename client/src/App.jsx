import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AddPetPage from './pages/AddPetPage';
import ValidateUserPage from './pages/ValidateUserPage';
import SendRecoverPassPage from './pages/SendRecoverPassPage';
import UseRecoveryPassCode from './pages/UseRecoveryPassCode';
import CreatePostPage from './pages/CreatePostPage';

const App = () => {
    return (
        <>
            <Header />
            <Toaster
                poition="top-center"
                toastOptions={{
                    duration: 5000,
                }}
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="users/validate/:regCode"
                    element={<ValidateUserPage />}
                />
                <Route
                    path="/users/password/recover/request"
                    element={<SendRecoverPassPage />}
                />
                <Route
                    path="/users/password/:recoverPassCode"
                    element={<UseRecoveryPassCode />}
                />
                <Route path="/posts/create" element={<CreatePostPage />} />
                <Route path="/users/profile" element={<UserProfilePage />} />
                <Route path="/pets/addpet" element={<AddPetPage />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
