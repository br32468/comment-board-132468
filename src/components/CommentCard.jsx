function CommentCard({ comment }) {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '10px 0', backgroundColor: '#f9f9f9' }}>
            <p><strong>ID:</strong> {comment.id}</p>
            <p><strong>Post ID:</strong> {comment.postId}</p>
            <p><strong>Name:</strong> {comment.name}</p>
            <p><strong>Email:</strong> {comment.email}</p>
            <p><strong>Body:</strong> {comment.body}</p>
            <p><strong>Rating:</strong> {comment.rating}</p>
            <p><strong>Approved:</strong> {comment.approved ? 'Yes' : 'No'}</p>
            {comment.approved === true && <p style={{ color: 'green', fontWeight: 'bold' }}>✅ Approved</p>}
            {comment.rating === 5 && <p style={{ color: 'blue', fontWeight: 'bold' }}>⭐ Top rated</p>}
        </div>
    );
}

export default CommentCard;