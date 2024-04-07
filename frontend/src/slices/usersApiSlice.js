import { apiSlice } from "./apiSlice.js";
import { USERS_URL,UPLOADS_URL } from "../constants.js"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getUsers: builder.query({
            query : ({keyword,pageNumber,selectedDomain,selectedGender,selectedAvailability}) => ({
                url: USERS_URL,
                params: {
                    keyword,
                    pageNumber,
                    domain: selectedDomain,
                    gender: selectedGender,
                    available: selectedAvailability,
                },
            }),
        }),
        createUser: builder.mutation({
            query: () => ({
                url: USERS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
            providesTags : ['Users'],
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data)  => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            providesTags: ['Users'],
        }),
        uploadUserImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOADS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {useGetUsersQuery,useDeleteUserMutation,useGetUserDetailsQuery,useCreateUserMutation,useUpdateUserMutation,useUploadUserImageMutation} = usersApiSlice;