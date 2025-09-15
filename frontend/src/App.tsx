import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [movie, setMovie] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/movie`, { name: movie });
      setResponse(res.data.message);
    } catch (err) {
      setResponse('Error connecting to backend.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Watch Next</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter a movie name..."
          value={movie}
          onChange={e => setMovie(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Checking...' : 'Submit'}
        </button>
      </form>
      {response && <div style={styles.response}>{response}</div>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf6e3 0%, #d1eaff 100%)',
    padding: '2rem'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#0366d6'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px'
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1'
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    background: '#0366d6',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  response: {
    marginTop: '1.5rem',
    fontSize: '1.2rem',
    color: '#333',
    background: '#e3fcec',
    padding: '1rem',
    borderRadius: '8px'
  }
};

export default App;