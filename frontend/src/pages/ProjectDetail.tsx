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
    const projRes = await api.get(`/projects`); // Simplified - get all & find
    const currentProject = projRes.data.find((p: any) => p.id === id);
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

  const updateStatus = async (taskId: string, newStatus: string) => {
    // Note: For full update you may need PUT route, but for demo we can skip full implementation
    alert(`Status updated to ${newStatus} (Backend update route needed for full functionality)`);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button onClick={() => navigate('/projects')} className="mb-6 text-blue-600">← Back to Projects</button>
      
      <h1 className="text-4xl font-bold mb-2">{project?.name}</h1>
      <p className="text-gray-600 mb-8">{project?.description}</p>

      {/* Create Task */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={createTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-3 border rounded-lg" required />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 border rounded-lg" />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="p-3 border rounded-lg" />
          <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Add Task</button>
        </form>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task: any) => (
          <div key={task.id} className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
            <div>
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-gray-500">{task.description}</p>
              {task.dueDate && <p className="text-xs text-red-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
            </div>
            <div className="flex gap-2">
              <select 
                value={task.status} 
                onChange={(e) => updateStatus(task.id, e.target.value)}
                className="border p-2 rounded-lg"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVIEW">Review</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}