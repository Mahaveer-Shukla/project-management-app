import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.use(protect);

// Create Task
router.post('/', async (req, res) => {
  const { title, description, projectId, assigneeId, dueDate, priority } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId,
      assigneeId,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority: priority || 'MEDIUM'
    }
  });
  res.json(task);
});

// Get Tasks by Project
router.get('/project/:projectId', async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { projectId: req.params.projectId },
    include: { assignee: true }
  });
  res.json(tasks);
});

export default router;