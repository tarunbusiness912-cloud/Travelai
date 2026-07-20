import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { user } = await loginUser(email, password);
      login(user);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email credentials or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
          <Sparkles className="h-6 w-6 fill-white/20" />
        </div>
        <h2 className="text-center text-3xl font-black tracking-tight text-slate-800">
          Welcome back
        </h2>
        <p className="text-center text-sm font-semibold text-slate-500">
          Access your optimized itineraries & trip workspaces
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-slate-100 shadow-sm sm:rounded-2xl sm:px-10 space-y-6">
          
          {location.state?.message && !error && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm font-semibold">
              {location.state.message}
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-800 font-medium placeholder-slate-450 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-800 font-medium placeholder-slate-450 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-150 hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm font-medium text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
                Register here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
