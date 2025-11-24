import axios from 'axios';

const Footer = async () => {
    let yoMamaJoke = 'Yo mama is so ugly 404 pages refuse to show her.';
    try {
        const response = await axios.get('https://yomama-jokes.com/api/random');
        yoMamaJoke = response.data.joke;
        yoMamaJoke = response.data.joke;
    } catch (error) {
        console.error(
            'Yo mama so dumb she thought next.js is the sequel to previous.js',
            error
        );
    }
    return (
        <footer className='text-center p-4 mt-auto'>
            <p>🔥{yoMamaJoke}🔥</p>
        </footer>
    );
};

export default Footer;
