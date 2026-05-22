import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.use(protect);   // All project routes require login

// Create Project
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: req.user.id
      }
    });
    res.json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Projects of User
router.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { ownerId: req.user.id },
        { members: { some: { userId: req.user.id } } }
      ]
    },
    include: { tasks: true }
  });
  res.json(projects);
});

export default router;