import express from 'express';
import { addTeam,getTeamById,getTeams } from '../controllers/teamController.js';

const router = express.Router();
router.route('/').post(addTeam).get(getTeams);
router.route('/:id').get(getTeamById);

export default router;