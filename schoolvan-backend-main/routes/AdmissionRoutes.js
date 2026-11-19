import express from 'express';
import { createAdmission, getAdmissions, deleteAdmission } from '../controllers/admissionController.js';
import { isCarOwner } from '../middleware/auth.js';

const router = express.Router();

router.post('/submit', createAdmission);
router.get('/', isCarOwner, getAdmissions);
router.delete('/:id', isCarOwner, deleteAdmission);

export default router;







