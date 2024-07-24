import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardHomepage from '../../components/CardHomepage';
import axios from 'axios';
import "./HomePage.scss";

interface Post {
    _id: string;
    title: string;
    description: string;
    image: string | null;
}

const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts", error);
        }
    };

    const deletePost = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`);
            setPosts(posts.filter(post => post._id !== id));
        } catch (error) {
            console.error("Error deleting post", error);
        }
    };

    const editPost = (post: Post) => {
        setIsEditing(true);
        setCurrentPost(post);
        setTitle(post.title);
        setDescription(post.description);
        setImage(post.image);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentPost) {
            try {
                const updatedPost = { title, description, image };
                await axios.put(`http://localhost:5000/api/posts/${currentPost._id}`, updatedPost);
                fetchPosts(); // Refresh the posts list
                setIsEditing(false);
                setCurrentPost(null);
                setTitle('');
                setDescription('');
                setImage(null);
            } catch (error) {
                console.error("Error updating post", error);
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="home-page">
            <h1>Home Page</h1>
            {isEditing && currentPost ? (
                <Form onSubmit={handleEditSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control 
                            type="file" 
                            onChange={handleImageChange} 
                            accept="image/*"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="secondary" type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                </Form>
            ) : (
                <ul className="posts-list">
                    {posts.map(post => (
                        <CardHomepage
                            key={post._id}
                            imageSrc={post.image}
                            title={post.title}
                            text={post.description}
                            editPost={() => editPost(post)}
                            deletePost={() => deletePost(post._id)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomePage;
