import { useEffect, useState } from 'react';
import {
  subscribeToComments,
  addComment,
  MAX_COMMENT_LENGTH,
} from '../services/commentsService.js';

export function useComments(movieId) {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    return subscribeToComments(movieId, setComments);
  }, [movieId]);

  const submitComment = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_COMMENT_LENGTH) return false;

    setSubmitting(true);
    setError('');
    try {
      await addComment(movieId, trimmed);
      return true;
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment. Please try again.');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { comments, submitting, error, submitComment };
}
