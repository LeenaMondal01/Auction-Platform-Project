import {createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import {toast} from "react-toastify";

const userSlice = createSlice({
    name:"user",
    initialState:{
        loading:false,
        isAuthenticated:false,
        user:{},
        leaderboard:[],
   
    },
    reducers:{
        logoutSuccess(state,action){
            state.isAuthenticated = false;
            state.user={};
          
        },
        logoutFailed(state,action){
            state.loading=false;
            state.isAuthenticated=state.isAuthenticated;
            state.user=state.user;

         },
        clearAllErrors(state,action){
            state.user=state.user;
            state.isAuthenticated=state.isAuthenticated;
            state.leaderboard=state.leaderboard;
            state.loading=false;
         },
     },
  });

    export const logout=()=>async(dispatch)=>{
        try{
          const response= await axios.get("http://localhost:5000/api/v1/user/logout,",{withCredentials:true});
          dispatch(userSlice.actions.logoutSuccess());
          toast.success(response.data.message);  
          dispatch(userSlice.actions.clearAllErrors());
        }catch(error){
           dispatch(userSlice.actions.logoutFailed());
           toast.error(error.response.data.message);
           dispatch(userSlice.actions.clearAllErrors());
        }
    };
  export default userSlice.reducer;