import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-6 overflow-hidden relative">

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">

        <div className="hidden lg:block">

          <div className="mb-8 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-2xl">
              T
            </div>

            <div>
              <h1 className="text-4xl font-black text-white">
                TaskFlow
              </h1>

              <p className="text-slate-400">
                SaaS Project Management Platform
              </p>
            </div>
          </div>

          <h2 className="text-6xl font-black leading-tight text-white">
            Organize.
            <br />
            Collaborate.
            <br />
            Deliver Faster.
          </h2>

          <p className="mt-8 text-lg text-slate-400 leading-relaxed max-w-xl">
            Manage projects, assign tasks, track productivity, and collaborate with your team using a modern workflow management system.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-5">

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
              <h3 className="text-4xl font-black text-blue-400">
                24+
              </h3>

              <p className="text-slate-400 mt-2 text-sm">
                Active Teams
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
              <h3 className="text-4xl font-black text-green-400">
                120+
              </h3>

              <p className="text-slate-400 mt-2 text-sm">
                Tasks Managed
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
              <h3 className="text-4xl font-black text-purple-400">
                99%
              </h3>

              <p className="text-slate-400 mt-2 text-sm">
                Productivity
              </p>
            </div>

          </div>

        </div>

        <div className="w-full max-w-md mx-auto">

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[32px] p-10">

            <div className="mb-8">
              <h2 className="text-4xl font-black text-white">
                Welcome Back
              </h2>

              <p className="text-slate-400 mt-3">
                Login to continue managing your projects.
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm text-slate-300 mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-3">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:scale-[1.02] transition duration-300 shadow-2xl disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

            </form>

            <div className="mt-8 text-center text-slate-400">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Create Account
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
