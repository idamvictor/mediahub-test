 import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";
import {toast} from "react-toastify";

 const initialState = {
   isLoggedIn :false,
   user : null,
   isError : false,
   isSuccess: false,
   isLoading: false,
   message: "",
 };

 //Register user
 export const register = createAsyncThunk(
   "auth/register",
   async (userData, thunkAPI)=>{
      try {
         return await authService.register(userData)
         
      } catch (error) {
         const message = (
            error.response && 
            error.response.data &&
            error.response.data.message
         ) || error.message || error.toString();
         return thunkAPI.rejectWithValue(message);
      }
   }
 )

  //Login user
  export const login = createAsyncThunk(
   "auth/login",
   async (userData, thunkAPI)=>{
      try {
         return await authService.login(userData)
         
      } catch (error) {
         const message = (
            error.response && 
            error.response.data &&
            error.response.data.message
         ) || error.message || error.toString();
         return thunkAPI.rejectWithValue(message);
      }
   }
 )

  //Logout user
  export const logout = createAsyncThunk(
   "auth/logout",
   async (_, thunkAPI)=>{
      try {
         return await authService.logout()
         
      } catch (error) {
         const message = (
            error.response && 
            error.response.data &&
            error.response.data.message
         ) || error.message || error.toString();
         return thunkAPI.rejectWithValue(message);
      }
   }
 )
/*
   //Get login status
   export const getLoginStatus = createAsyncThunk(
      "auth/getLoginStatus",
      async (_, thunkAPI)=>{
         try {
            return await authService.getLoginStatus()
            
         } catch (error) {
            const message = (
               error.response && 
               error.response.data &&
               error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
         }
      }
    )*/
/*
      //Get user
   export const getUser = createAsyncThunk(
      "auth/getUser",
      async (userData, thunkAPI)=>{
         try {
            return await authService.getUser(userData)
            
         } catch (error) {
            const message = (
               error.response && 
               error.response.data &&
               error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
         }
      }
    )
*//*
      //update user
   export const updateUser = createAsyncThunk(
      "auth/updateUser",
      async (userData, thunkAPI)=>{
         try {
            return await authService.updateUser(userData)
            
         } catch (error) {
            const message = (
               error.response && 
               error.response.data &&
               error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
         }
      }
    )

      //update Photo
   export const updatePhoto = createAsyncThunk(
      "auth/updatePhoto",
      async (userData, thunkAPI)=>{
         try {
            return await authService.updatePhoto(userData)
            
         } catch (error) {
            const message = (
               error.response && 
               error.response.data &&
               error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
         }
      }
    )*/
 const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
      RESET_AUTH(state){
         state.isError = false;
         state.isSuccess =false;
         state.isLoading= false;
         state.message= "";
      },
    },
    extraReducers: (builder)=>{
      builder
      //Register user
      .addCase(register.pending,(state)=>{
          state.isLoading = true;
      })
      .addCase(register.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.isSuccess =true;
         state.isLoggedIn =true;
         state.user = action.payload;
         toast.success("Registration successful")
         console.log(action.payload)

     })
     .addCase(register.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError =true;
      state.message = action.payload;
      state.user = null;
      toast.error(action.payload);
  })

   //Login user
   .addCase(login.pending,(state)=>{
      state.isLoading = true;

  })
  .addCase(login.fulfilled,(state,action)=>{
     state.isLoading = false;
     state.isSuccess =true;
     state.isLoggedIn =true;
     state.user = action.payload;
     toast.success("Login successful")
     console.log(action.payload)
 })
 .addCase(login.rejected,(state,action)=>{
  state.isLoading = false;
  state.isError =true;
  state.message = action.payload;
  state.user = null;
  toast.error(action.payload);
})


   //Logout user
   .addCase(logout.pending,(state)=>{
      state.isLoading = true;

  })
  .addCase(logout.fulfilled,(state,action)=>{
     state.isLoading = false;
     state.isSuccess =true;
     state.isLoggedIn =true;
     state.user = action.payload;
     toast.success(action.payload)
     console.log(action.payload)
 })
 .addCase(logout.rejected,(state,action)=>{
  state.isLoading = false;
  state.isError =true;
  state.message = action.payload;
  toast.error(action.payload);
})

  



/*

//Update User

.addCase(updateUser.pending,(state)=>{
   state.isLoading = true;

})
.addCase(updateUser.fulfilled,(state,action)=>{
  state.isLoading = false;
  state.isSuccess =true;
  state.isLoggedIn =true;
  state.user = action.payload;
  toast.success("Photo updated")
  console.log(action.payload)
 
})
.addCase(updateUser.rejected,(state,action)=>{
state.isLoading = false;
state.isError =true;
state.message = action.payload;
toast.error("Failed to update Photo")
console.log(action.payload)
});
*/
    }
 });
 

 export const { RESET_AUTH } = authSlice.actions;
 export default authSlice.reducer;

 