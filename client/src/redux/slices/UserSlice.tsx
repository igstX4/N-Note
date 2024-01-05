import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {FormLoginData, FormRegisterData, NoteI} from "../../interfaces/Interfaces";
import $api from "../../api/axios";
import {AxiosError} from "axios";

export const fetchLogin = createAsyncThunk(
    "api/signIn",
    async (data : FormLoginData) => {
        try {
            const response = await $api.post("auth/login", data);
            localStorage.setItem('token', response.data.accessToken)
            return {
                createdNotes: response.data.user.createdNotes,
                email: response.data.user.email,
                id: response.data.user.id,
                isActivated: response.data.user.isActivated,
                username: response.data.user.username,
            };
        } catch (err : any) {
            return err.response?.data?.message
        }
    }
);
export const fetchRegister = createAsyncThunk(
    "api/signUp",
    async (data : FormRegisterData) => {
        try {
            const response = await $api.post("user/register", data);
            localStorage.setItem('token', response.data.accessToken)
            return {
                createdNotes: response.data.user.createdNotes,
                email: response.data.user.email,
                id: response.data.user.id,
                isActivated: response.data.user.isActivated,
                username: response.data.user.username,
            };
        } catch (err : any) {
            return err.response?.data?.message
        }
    }
);
export const fetchMe = createAsyncThunk(
    "api/getMe",
    async () => {
                // response.data.user.createdNotes
                const response = await $api.get("user/me");
                console.log(response)
                return {
                    createdNotes: response.data.createdNotes,
                    email: response.data.email,
                    id: response.data.id,
                    isActivated: response.data.isActivated,
                    username: response.data.username,
                };
    }
);
interface UserState {
    createdNotes: NoteI[],
    email: string,
    id: string,
    isActivated: boolean,
    username : string,
}
interface InitialStateI {
    error: string
    data: UserState | null,
    title: string
}
// Define the initial state using that type
const initialState: InitialStateI = {
    error: "",
    data: null,
    title: "Loading"
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setTitle : (state, action : PayloadAction<string>) => {
            state.title = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state, action) => {
            state.error = ''
            state.data = null
        })
        builder.addCase(fetchLogin.fulfilled, (state, action ) => {
            state.error = ''
            if (action.payload.username) {
                state.error = ''
                state.data = action.payload
            } else {
                state.data = null
                state.error = action.payload
            }
        })
        builder.addCase(fetchRegister.pending, (state, action) => {
            state.error = ''
            state.data = null
        })
        builder.addCase(fetchRegister.fulfilled, (state, action ) => {
            state.error = ''
            console.log(action.payload)
            if (action.payload.username) {
                state.error = ''
                state.data = action.payload
            } else {
                state.data = null
                state.error = action.payload
            }
        })
        builder.addCase(fetchMe.pending, (state, action) => {
            state.error = ''
            state.data = null
        })
        builder.addCase(fetchMe.fulfilled, (state, action ) => {
            state.error = ''
            state.data = action.payload
        })
        builder.addCase(fetchMe.rejected, (state, action ) => {
            state.error = ''
            state.data = null
        })


    }
})

export const {setTitle} = userSlice.actions

export default userSlice.reducer