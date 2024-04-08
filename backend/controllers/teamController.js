import asyncHandler from '../middleware/asyncHandler.js';
import Team from '../models/teamModel.js';

// @route   POST /api/teams

const addTeam = asyncHandler(async (req, res) => {

   const {
    name,
    teamMembers,
    objective,
   } = req.body;

   if(teamMembers && teamMembers.length === 0){
       res.status(400);
       throw new Error('no team members');
   }
   else{
       const team = new Team({
        name,
        teamMembers: teamMembers.map((x) => (
        {...x,
        members: x._id,
        _id: undefined,
        })),
        objective,
       });

   const createTeam = await team.save();

   res.status(201).json(createTeam);
    }
});

// @desc    Get team by ID
// @route   GET /api/teams/:id

const getTeamById = asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id);
    
      if (team) {
        res.json(team);
      } else {
        res.status(404);
        throw new Error('team not found');
      }
});

const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find({});
    res.status(200).json(teams);
});
export { addTeam,getTeamById,getTeams};