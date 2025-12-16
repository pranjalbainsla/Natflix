import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.js'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'

const Root = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return user ? <App /> : <Login />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
