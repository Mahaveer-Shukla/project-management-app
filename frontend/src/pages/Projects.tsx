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
      await api.post('/projects', { name, description });
      setName('');
      setDescription('');
      fetchProjects();
    } catch (err) {
      alert("Failed to create project");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">My Projects</h1>
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900">← Dashboard</button>
        </div>

        {/* Create Form */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-semibold mb-6">Create New Project</h2>
          <form onSubmit={createProject} className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)}
              className="flex-1 p-4 border rounded-2xl focus:outline-none focus:border-blue-500" required />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
              className="flex-1 p-4 border rounded-2xl focus:outline-none focus:border-blue-500" />
            <button type="submit" disabled={loading} 
              className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 disabled:bg-gray-400">
              Create Project
            </button>
          </form>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
            <div 
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="bg-white rounded-3xl p-8 shadow-sm card border border-gray-100 cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.name}</h3>
              <p className="text-gray-600 line-clamp-3 mb-6">{project.description || "No description"}</p>
              
              <div className="flex justify-between items-center pt-6 border-t">
                <span className="text-sm text-gray-500">Tasks</span>
                <span className="font-semibold text-xl">{project.tasks?.length || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}