import { TEAMS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const teamsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        addTeam: builder.mutation({
            query: (team) => ({
                url : TEAMS_URL,
                method : 'POST',
                body : team,
            }),
        }),
        getTeamDetails: builder.query({
            query: (id) => ({
                url : `${TEAMS_URL}/${id}`,
            }),
            keepUnusedDataFor : 5,
        }),
        getTeams: builder.query({
            query: () => ({
                url: TEAMS_URL,
            }),
        }),
    }),
});

export const {useAddTeamMutation , useGetTeamDetailsQuery, useGetTeamsQuery} = teamsApiSlice;

