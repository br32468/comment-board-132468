import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import CommentCard from './components/CommentCard.jsx;
import RegisterComment from './components/RegisterComment.jsx;

// Student: Besir Rexhepi | ID: 132468

function App() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchComments = () => {
        setLoading(true);
        setError(null);
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                setComments(data.map(c => ({
                    ...c,
                    rating: 5,
                    approved: false
                })));
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => { fetchComments(); }, []);

    const addComment = useCallback((newComment) => {
        setComments(prev => [...prev, { ...newComment, id: Date.now() }]);
    }, []);

    const averageRating = useMemo(() => {
        if (comments.length === 0) return 0;
        const sum = comments.reduce((acc, c) => acc + c.rating, 0);
        return (sum / comments.length).toFixed(2);
    }, [comments]);

    const nameRef = useRef(null);

    if (loading) return <p>Loading comments...</p>;
    if (error) return (
        <div>
            <p>Error: {error}</p>
            <button onClick={fetchComments}>Retry</button>
        </div>
    );

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Comment Board</h1>
            <p><strong>Average Rating: {averageRating}</strong></p>
            {comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
            <RegisterComment onAdd={addComment} nameRef={nameRef} />
        </div>
    );
}

export default App;