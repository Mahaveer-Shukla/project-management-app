import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <nav className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              T
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                TaskFlow
              </h1>

              <p className="text-sm text-slate-400">
                Project Management Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">

            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm text-slate-400">
                Welcome back
              </span>

              <span className="font-semibold text-white">
                {user?.name}
              </span>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition duration-300 shadow-xl font-semibold"
            >
              My Projects
            </button>

            <button
              onClick={logout}
              className="px-5 py-3 rounded-2xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition font-medium text-red-400"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-14">

        <div className="mb-14">
          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Welcome back,
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {user?.name?.split(' ')[0]} 👋
            </span>
          </h2>

          <p className="text-slate-400 text-lg mt-5 max-w-2xl">
            Track projects, manage tasks, and monitor team productivity from your modern workspace dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:scale-[1.02] transition duration-300 shadow-2xl">

            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-sm font-semibold tracking-widest text-blue-400 uppercase">
                Total Projects
              </div>

              <div className="mt-7 flex items-end gap-3">
                <h3 className="text-6xl font-black">
                  04
                </h3>

                <span className="text-green-400 text-sm font-medium mb-2">
                  +12%
                </span>
              </div>

              <p className="text-slate-400 mt-4">
                Active project workspaces currently running.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:scale-[1.02] transition duration-300 shadow-2xl">

            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-sm font-semibold tracking-widest text-orange-400 uppercase">
                Pending Tasks
              </div>

              <div className="mt-7 flex items-end gap-3">
                <h3 className="text-6xl font-black">
                  12
                </h3>

                <span className="text-yellow-400 text-sm font-medium mb-2">
                  Needs Action
                </span>
              </div>

              <p className="text-slate-400 mt-4">
                Tasks waiting for completion or updates.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:scale-[1.02] transition duration-300 shadow-2xl">

            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-sm font-semibold tracking-widest text-red-400 uppercase">
                Overdue
              </div>

              <div className="mt-7 flex items-end gap-3">
                <h3 className="text-6xl font-black">
                  03
                </h3>

                <span className="text-red-400 text-sm font-medium mb-2">
                  Urgent
                </span>
              </div>

              <p className="text-slate-400 mt-4">
                Tasks exceeding assigned deadlines.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold">
                  Productivity Overview
                </h3>

                <p className="text-slate-400 mt-2">
                  Weekly team performance insights
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 text-sm">
                Live Data
              </div>
            </div>

            <div className="space-y-6">

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Project Completion</span>
                  <span className="text-blue-400">78%</span>
                </div>

                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Task Efficiency</span>
                  <span className="text-green-400">64%</span>
                </div>

                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[64%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Team Collaboration</span>
                  <span className="text-purple-400">89%</span>
                </div>

                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[89%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
              </div>

            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-2xl flex flex-col justify-between">

            <div>
              <div className="text-sm uppercase tracking-widest text-blue-100">
                Quick Access
              </div>

              <h3 className="text-3xl font-bold mt-4 leading-snug">
                Manage all your projects in one place.
              </h3>

              <p className="text-blue-100 mt-5 leading-relaxed">
                Create tasks, assign work, track progress, and collaborate efficiently with your team members.
              </p>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="mt-10 w-full py-4 rounded-2xl bg-white text-slate-900 font-bold text-lg hover:scale-105 transition duration-300 shadow-xl"
            >
              🚀 Open Workspace
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
