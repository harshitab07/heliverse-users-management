import { createSlice } from '@reduxjs/toolkit';


const initialState = localStorage.getItem('team')
  ? JSON.parse(localStorage.getItem('team'))
  : { teamMembers: []};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addToTeam: (state, action) => {
      // NOTE: we don't need user, rating, numReviews or reviews
      // in the cart
      const member = action.payload;

      state.teamMembers = [...state.teamMembers, member];
      localStorage.setItem('team', JSON.stringify(state));
    },
    removeFromTeam: (state, action) => {
        state.teamMembers = state.teamMembers.filter((x) => x._id !== action.payload);
        localStorage.setItem('team', JSON.stringify(state));
    },
    clearTeamMembers: (state, action) => {
        state.teamMembers = [];
        localStorage.setItem('team', JSON.stringify(state));
    },
    resetTeam: (state) => (state = initialState),
  },
});

export const {
  addToTeam,
  removeFromTeam,
  clearTeamMembers
} = teamSlice.actions;

export default teamSlice.reducer;