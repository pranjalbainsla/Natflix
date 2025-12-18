import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.js';

const Chat = ({ movie, user, onClick }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [expand, setExpand] = useState(1);

    const movieId = movie.id;

    // Fetch comments for this movie
    useEffect(() => {
        const commentsRef = collection(db, 'movies', movieId.toString(), 'comments');
        const q = query(commentsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const commentsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsData);
        });

        return () => unsubscribe();
    }, [movieId]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent closing the chat card

        if (!newComment.trim() || !user) return;

        setLoading(true);
        try {
            const commentsRef = collection(db, 'movies', movieId.toString(), 'comments');
            await addDoc(commentsRef, {
                text: newComment.trim(),
                userId: user.uid,
                userName: user.displayName || user.email,
                userPhoto: user.photoURL || null,
                createdAt: serverTimestamp()
            });
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-card">
            <div className="chat-content" onClick={(e) => e.stopPropagation()}>
                <p className={`movie-overview ${expand === 1 ? "expanded" : ""}`} onClick={()=>setExpand(prev => 1-prev)}>{expand === 1 ? (
                    movie.overview ) : ( movie.overview.split(" ").slice(0, 4).join(" ") + "..."

                )}</p>
                
                <div className="comments-section" onClick={onClick}>
                    <h3 className="comments-title">Comments</h3>
                    <div className="comments-list">
                        {comments.length === 0 ? (
                            null
                        ) : (
                            comments.map((comment) => (
                                <div 
                                    key={comment.id} 
                                    className={`comment-item ${user && comment.userId === user.uid ? 'user-comment' : ''}`}
                                >
                                    <div className={`comment-header  ${user && comment.userId === user.uid ? 'user-author' : ''}`}>
                
                                        <span className={`comment-author`}>{comment.userName}</span>
                                       
                                    </div>
                                    <p className="comment-text">{comment.text}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className='comment-box'>
                    {user && (
                        <form className="comment-form" onSubmit={handleSubmitComment}>
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="comment-input"
                                disabled={loading}
                            />
                            <button type="submit" className="comment-submit" disabled={loading || !newComment.trim()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.0" stroke="currentColor" className="submit-icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chat
