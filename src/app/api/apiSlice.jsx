import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import { LogOut,setCredentials } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl:'http://localhost:8000',
    credentials:'include', // Include HttpOnly cookies automatically
});

const baseQueryWithReauth = async(args,api,extraOptions)=>{
    let result = await baseQuery(args,api,extraOptions);

    if(result?.error?.status === 401 || result?.error?.status === 403){
        console.log('sending refresh token');
        const refreshResult = await baseQuery({ url: '/refresh', method: 'POST' }, api, extraOptions);
        
        if(refreshResult?.data){
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({...refreshResult.data, user})); 
            result = await baseQuery(args,api,extraOptions);
        } else {
            api.dispatch(LogOut()); 
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery:baseQueryWithReauth,
    endpoints: (builder) => ({})
})