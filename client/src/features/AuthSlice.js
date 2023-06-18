import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    user : JSON.parse(localStorage.getItem('user')) || null ,
    isLoading : false,
    isSucces : false,
    isError : false,
    message : ''
}

export const LoginUser = createAsyncThunk('user/login', async (user, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            username : user.username,
            password : user.password
        })
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data 
    } catch (error) {
        const message = error.response.data.message
        return thunkApi.rejectWithValue(message)
    }
})

export const UpdateUser = createAsyncThunk('user/updateUser', async (user, thunkApi) => {
    try {
        const res = await axios.put(`http://localhost:5000/api/user/${user._id}`, {
            userId : user._id,
            username : user.username,
            email : user.email,
            password : user.password,
            profilePic : user.profilePic
        })
        return res.data
    } catch (error) {
        const message = error.response.data.message
        console.log(message)
        return thunkApi.rejectWithValue(initialState.user)
    }
})

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        reset : (state) => {
            state.user = null
            state.isError = false
            state.isLoading = false
            state.isSucces = false
            state.message = ''
        },
        updateDate: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        }),
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload 
        }),
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }),
        // Update User
        builder.addCase(UpdateUser.pending, (state) => {
            state
            state.isLoading = true
        }),
        builder.addCase(UpdateUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload 
            state.isSucces = true
        }),
        builder.addCase(UpdateUser.rejected, (state, action) => {
            state.isLoading = false
            state.isSucces = false
            state.isError = true
            state.user.push(action.payload)  
        })
    }
})
export const {reset, updateDate} = authSlice.actions
export default authSlice.reducer