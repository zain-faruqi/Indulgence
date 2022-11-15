import React, {useEffect, useState} from 'react'
import './styles.css';
import { Loading } from 'react-loading-dot'
import { Navigate } from 'react-router-dom';

export default function LoadingScreen() {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Loading">
        {loading ? <Loading background='rgb(255, 255, 255)'/> : <Navigate to="/results" />}
    </div>
  )
}
