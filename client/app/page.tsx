import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
    return (
        <div className='text-center'>
            <h1 className='text-4xl font-bold mb-4 text-gray-800'>
                Welcome to Pat²
            </h1>
            <p className='text-gray-600 mb-2'>
                This is a placeholder homepage.
            </p>
            <p className='text-gray-600 mb-6'>Test out API stuff down below.</p>

            <Link href='/users/register'>
                <Button>Register</Button>
            </Link>
        </div>
    );
};

export default Home;
