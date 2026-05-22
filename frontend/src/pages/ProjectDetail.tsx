import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchData = async () => {
    const projRes = await api.get(`/projects`);

    const currentProject = projRes.data.find(
      (p: any) => p.id === id
    );

    setProject(currentProject);

    const taskRes = await api.get(`/tasks/project/${id}`);
    setTasks(taskRes.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post('/tasks', {
      title,
      description,
      projectId: id,
      dueDate
    });

    setTitle('');
    setDescription('');
    setDueDate('');

    fetchData();
  };

  const updateStatus = async (
    taskId: string,
    newStatus: string
  ) => {
    alert(
      `Status updated to ${newStatus} (Backend update route needed for full functionality)`
    );

    fetchData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'bg-green-500/10 text-green-400 border-green-500/20';

      case 'IN_PROGRESS':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';

      case 'REVIEW':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';

      default:
        return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
    }
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

            <button
              onClick={() => navigate('/projects')}
              className="mb-6 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition backdrop-blur-xl text-slate-300 font-medium"
            >
              ← Back to Projects
            </button>

            <h1 className="text-5xl font-black leading-tight">
              {project?.name}
            </h1>

            <p className="text-slate-400 text-lg mt-5 max-w-3xl leading-relaxed">
              {project?.description || 'No project description available.'}
            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl min-w-[180px]">

              <p className="text-sm uppercase tracking-widest text-blue-400">
                Total Tasks
              </p>

              <h2 className="text-5xl font-black mt-5">
                {tasks.length}
              </h2>

            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 shadow-2xl min-w-[180px]">

              <p className="text-sm uppercase tracking-widest text-blue-100">
                Progress
              </p>

              <h2 className="text-5xl font-black mt-5">
                78%
              </h2>

            </div>

          </div>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl mb-14">

          <div className="mb-8">
            <h2 className="text-3xl font-black">
              Add New Task
            </h2>

            <p className="text-slate-400 mt-2">
              Create and manage tasks for this workspace.
            </p>
          </div>

          <form
            onSubmit={createTask}
            className="grid grid-cols-1 lg:grid-cols-4 gap-5"
          >

            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />

            <input
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-6 py-4 font-bold text-lg hover:scale-[1.02] transition duration-300 shadow-2xl"
            >
              Add Task
            </button>

          </form>

        </div>

        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-4xl font-black">
              Project Tasks
            </h2>

            <p className="text-slate-400 mt-2">
              Track progress and update task status efficiently.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-xl">
            <span className="w-3 h-3 rounded-full bg-green-400"></span>

            <span className="text-sm text-slate-300">
              Workspace Active
            </span>
          </div>

        </div>

        {tasks.length === 0 ? (

          <div className="rounded-[32px] border border-dashed border-white/10 bg-white/5 backdrop-blur-2xl p-20 text-center">

            <h3 className="text-3xl font-black text-white">
              No Tasks Yet
            </h3>

            <p className="text-slate-400 mt-4 text-lg">
              Add your first task to begin tracking progress.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {tasks.map((task: any) => (

              <div
                key={task.id}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl hover:scale-[1.01] transition duration-300"
              >

                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-4 mb-5">

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-xl">
                        {task.title?.charAt(0)}
                      </div>

                      <div>

                        <h3 className="text-2xl font-black text-white">
                          {task.title}
                        </h3>

                        <div
                          className={`mt-2 inline-flex items-center px-4 py-2 rounded-xl border text-sm font-medium ${getStatusColor(task.status)}`}
                        >
                          {task.status || 'TODO'}
                        </div>

                      </div>

                    </div>

                    <p className="text-slate-400 leading-relaxed text-lg">
                      {task.description || 'No task description available.'}
                    </p>

                    {task.dueDate && (

                      <div className="mt-5 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        ⏰ Due:
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>

                    )}

                  </div>

                  <div className="w-full lg:w-[220px]">

                    <label className="block text-sm text-slate-400 mb-3">
                      Update Status
                    </label>

                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(task.id, e.target.value)
                      }
                      className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="TODO">
                        To Do
                      </option>

                      <option value="IN_PROGRESS">
                        In Progress
                      </option>

                      <option value="REVIEW">
                        Review
                      </option>

                      <option value="DONE">
                        Done
                      </option>

                    </select>

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
