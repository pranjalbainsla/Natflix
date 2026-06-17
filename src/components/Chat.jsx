import React, { useState } from 'react';
import { useComments } from '../hooks/useComments';
import { MAX_COMMENT_LENGTH } from '../services/commentsService';

const Chat = ({ movie, onClick }) => {
  const [newComment, setNewComment] = useState('');
  const [expand, setExpand] = useState(1);
  const { comments, submitting, error, submitComment } = useComments(movie.id);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!newComment.trim()) return;

    const success = await submitComment(newComment);
    if (success) {
      setNewComment('');
    }
  };

  return (
    <div className="chat-card">
      <div className="chat-content" onClick={(e) => e.stopPropagation()}>
        <p
          className={`movie-overview ${expand === 1 ? 'expanded' : ''}`}
          onClick={() => setExpand((prev) => 1 - prev)}
        >
          {expand === 1
            ? movie.overview
            : movie.overview.split(' ').slice(0, 4).join(' ') + '...'}
        </p>

        <div className="comments-section" onClick={onClick}>
          <h3 className="comments-title">Comments</h3>
          {error && (
            <p className="comment-error" role="alert">
              {error}
            </p>
          )}
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.userName}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="comment-box">
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-input"
              disabled={submitting}
              maxLength={MAX_COMMENT_LENGTH}
            />
            <button
              type="submit"
              className="comment-submit"
              disabled={submitting || !newComment.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.0"
                stroke="currentColor"
                className="submit-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
