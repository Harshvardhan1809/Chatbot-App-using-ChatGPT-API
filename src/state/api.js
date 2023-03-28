// redux-toolkit simplifies API calls

import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"; 

// api here is a section of the store 
export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}), 
    reducerPath: "main",
    tagTypes: [], 
    // defining an api endpoint
    endpoints: (build) => ({ 
        // mutation is used while making post calls 
        // in body, we send payload to backend
        postAiText: build.mutation({
            // query used in mutations to primarily construct the url
            // in case more arguments are needed, callback is needed
            query: (payload) => ({
                url: "openai/text", 
                method: "POST", 
                body: payload, 
            }),
        }),
        postAiCode: build.mutation({
            query: (payload) => ({
                url: "openai/code", 
                method: "POST", 
                body: payload, 
            }),
        }),
        postAiAssist: build.mutation({
            query: (payload) => ({
                url: "openai/assist", 
                method: "POST", 
                body: payload, 
            }),
        }),
        postLogin: build.mutation({
            query: (payload) => ({
                url: "auth/login", 
                method: "POST", 
                body: payload, 
            }),
        }),
        postSignUp: build.mutation({
            query: (payload) => ({
                url: "auth/signup", 
                method: "POST", 
                body: payload, 
            }),
        }),
    }),
})

// using a hook to call api 
export const { usePostAiTextMutation, usePostAiCodeMutation, usePostAiAssistMutation, usePostLoginMutation, usePostSignUpMutation } = api; 