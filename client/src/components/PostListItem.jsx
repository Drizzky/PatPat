import PropTypes from 'prop-types';
import defaultPetAvatar from '../assets/defaultPetAvatar.png';

const { VITE_API_URL } = import.meta.env;

const PostListItem = ({ caption, image, petAvatar, petName, createdAt }) => {
    return (
        <li className="postli">
            <header className="postHeader">
                <h3>{petName || 'Unknown Pet'}</h3>
                <img
                    className="postimg"
                    src={
                        petAvatar
                            ? `${VITE_API_URL}/${petAvatar}`
                            : defaultPetAvatar
                    }
                    alt="Pet avatar"
                />
            </header>
            <img src={`${VITE_API_URL}/${image}`} alt="Post image" />{' '}
            <p>{caption}</p>
            <footer className="postfooter">{createdAt}</footer>
        </li>
    );
};

PostListItem.propTypes = {
    caption: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    petAvatar: PropTypes.string,
    petName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default PostListItem;
