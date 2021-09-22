import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {},
    },
    reducers: {
        setUser: (state, newUser) => {
            localStorage.setItem("userdata", JSON.stringify(newUser));
            state.data = newUser;
            return state;
        },
        logOutUser: (state) => {
            state.data = {}
            localStorage.setItem("userdata", JSON.stringify({}));
            return state;
        },
        loadUser: (state) => {
            try {
                const user = JSON.parse(localStorage.getItem("userdata"));
                state.data = user;
            }
            catch(e){
                
            }
            return state;
            
        }
    }
})

export const { setUser, logOutUser, loadUser } = userSlice.actions

export default userSlice.reducer