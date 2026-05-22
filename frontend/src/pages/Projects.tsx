import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return;

    setLoading(true);

    try {
      await api.post('/projects', {
        name,
        description
      });

      setName('');
      setDescription('');

      fetchProjects();
    } catch (err) {
      alert('Failed to create project');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">

          <div>
            <h1 className="text-5xl font-black leading-tight">
              Project Workspace
            </h1>

            <p className="text-slate-400 mt-4 text-lg">
              Create, organize and manage all your projects from one place.
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition backdrop-blur-xl text-slate-300 font-medium"
          >
            ← Back to Dashboard
          </button>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

            <div className="text-sm uppercase tracking-widest text-blue-400">
              Total Projects
            </div>

            <h2 className="text-6xl font-black mt-6">
              {projects.length}
            </h2>

            <p className="text-slate-400 mt-4">
              Active workspaces currently available.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

            <div className="text-sm uppercase tracking-widest text-green-400">
              Team Productivity
            </div>

            <h2 className="text-6xl font-black mt-6">
              87%
            </h2>

            <p className="text-slate-400 mt-4">
              Average task completion efficiency.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-2xl">

            <div className="text-sm uppercase tracking-widest text-blue-100">
              Quick Create
            </div>

            <h2 className="text-3xl font-black mt-6 leading-snug">
              Launch your next project instantly.
            </h2>

            <p className="text-blue-100 mt-4">
              Start collaborating with your team efficiently.
            </p>

          </div>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl mb-14">

          <div className="mb-8">
            <h2 className="text-3xl font-black">
              Create New Project
            </h2>

            <p className="text-slate-400 mt-2">
              Add a new workspace and begin managing tasks.
            </p>
          </div>

          <form
            onSubmit={createProject}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          >

            <input
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />

            <input
              type="text"
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-6 py-4 font-bold text-lg hover:scale-[1.02] transition duration-300 shadow-2xl disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>

          </form>

        </div>

        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-4xl font-black">
              Your Projects
            </h2>

            <p className="text-slate-400 mt-2">
              Manage all active workspaces and tasks.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-xl">
            <span className="w-3 h-3 rounded-full bg-green-400"></span>

            <span className="text-sm text-slate-300">
              Workspace Active
            </span>
          </div>

        </div>

        {projects.length === 0 ? (

          <div className="rounded-[32px] border border-dashed border-white/10 bg-white/5 backdrop-blur-2xl p-20 text-center">

            <h3 className="text-3xl font-black text-white">
              No Projects Yet
            </h3>

            <p className="text-slate-400 mt-4 text-lg">
              Create your first project to start managing tasks and teams.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {projects.map((project: any) => (

              <div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl cursor-pointer hover:scale-[1.02] transition duration-300"
              >

                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl"></div>

                <div className="relative z-10">

                  <div className="flex items-center justify-between mb-6">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-xl">
                      {project.name?.charAt(0)}
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-green-500/10 text-green-400 text-sm font-medium">
                      Active
                    </div>

                  </div>

                  <h3 className="text-3xl font-black text-white mb-4 line-clamp-1">
                    {project.name}
                  </h3>

                  <p className="text-slate-400 leading-relaxed line-clamp-3 min-h-[72px]">
                    {project.description || 'No project description available.'}
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">

                    <div>
                      <p className="text-sm text-slate-500">
                        Total Tasks
                      </p>

                      <h4 className="text-2xl font-black mt-1">
                        {project.tasks?.length || 0}
                      </h4>
                    </div>

                    <button className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition text-sm font-semibold">
                      Open →
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}
