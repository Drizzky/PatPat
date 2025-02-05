import { useEffect, useState } from 'react';
import addpostbtn from '../assets/add-post.png';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthContext from '../hooks/useAuthContext';
import PostListItem from '../components/PostListItem';
import moment from 'moment';

const { VITE_API_URL } = import.meta.env;

const HomePage = () => {
    const { authToken, authUser } = useAuthContext();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const postsFetch = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/api/posts`, {
                    method: 'GET',
                    headers: authUser
                        ? {
                              Authorization: authToken,
                          }
                        : {},
                });

                const body = await res.json();

                setPosts(body.data.posts);
            } catch (err) {
                toast.error(err.message, {
                    id: 'homepage',
                });
            }
        };
        postsFetch();
    }, [authUser, authToken]);
    return (
        <>
            <h2 className="homeh2">
                Recently Featured Posts{' '}
                <Link to="/posts/create">
                    <img
                        src={addpostbtn}
                        alt="add-post"
                        className="addpostbtn"
                    />
                </Link>
            </h2>
            <main>
                <ul className="post-ul">
                    {posts.map((post) => {
                        return (
                            <PostListItem
                                key={post.id}
                                caption={post.caption}
                                image={post.image}
                                petAvatar={post.petAvatar}
                                petName={post.petName}
                                createdAt={moment(post.createdAt).format(
                                    'DD/MM/YY'
                                )}
                            />
                        );
                    })}
                </ul>
            </main>
        </>
    );
};

export default HomePage;
