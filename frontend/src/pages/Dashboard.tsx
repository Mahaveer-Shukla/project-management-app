import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">T</div>
            <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          
          <div className="flex items-center gap-8">
            <span className="text-gray-700">Hi, <span className="font-semibold">{user?.name}</span></span>
            
            <button 
              onClick={() => navigate('/projects')}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition shadow-sm"
            >
              My Projects
            </button>
            
            <button 
              onClick={logout}
              className="text-red-600 hover:text-red-700 font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Welcome back, {user?.name?.split(" ")[0]} 👋</h2>
        <p className="text-xl text-gray-600 mb-12">Here's what's happening with your projects</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm card border border-gray-100">
            <div className="text-blue-600 text-sm font-medium">TOTAL PROJECTS</div>
            <div className="text-6xl font-bold mt-6 text-gray-900">04</div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm card border border-gray-100">
            <div className="text-orange-600 text-sm font-medium">PENDING TASKS</div>
            <div className="text-6xl font-bold mt-6 text-gray-900">12</div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm card border border-gray-100">
            <div className="text-red-600 text-sm font-medium">OVERDUE</div>
            <div className="text-6xl font-bold mt-6 text-gray-900">03</div>
          </div>
        </div>

        <div className="mt-12">
          <button 
            onClick={() => navigate('/projects')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg rounded-2xl font-semibold hover:scale-105 transition shadow-lg flex items-center gap-3"
          >
            <span>🚀</span> Manage Projects
          </button>
        </div>
      </div>
    </div>
  );
}