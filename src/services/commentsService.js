import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase.js';

export const ANONYMOUS_USER = 'Anonymous';
export const MAX_COMMENT_LENGTH = 500;

export function subscribeToComments(movieId, onUpdate) {
  const commentsRef = collection(db, 'movies', movieId.toString(), 'comments');
  const q = query(commentsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onUpdate(comments);
  });
}

export async function addComment(movieId, text) {
  const trimmed = text.trim();

  if (!trimmed || trimmed.length > MAX_COMMENT_LENGTH) {
    throw new Error('Comment must be between 1 and 500 characters');
  }

  const commentsRef = collection(db, 'movies', movieId.toString(), 'comments');
  await addDoc(commentsRef, {
    text: trimmed,
    userName: ANONYMOUS_USER,
    createdAt: serverTimestamp(),
  });
}
