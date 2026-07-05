import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password);
      navigate(data.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
    >
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          <input required type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          <button type="submit" className="w-full bg-brand-dark text-white rounded-lg py-3">Login</button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account? <Link to="/register" className="text-brand-pink font-medium">Register</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;