import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from 'Redux/store';
import { UserState } from 'types/reduxSlice';

//initial state
const userState: UserState = {
  name: '',
  status: '',
};

//asynchronous
export const getUserAsync = createAsyncThunk('user/fetchCount', async () => {
  const response = await axios.get('', { withCredentials: true });
  return response;
});

//slice
export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.name = action.payload.data;
      });
  },
});

//selector
export const selectUser = (state: RootState) => state.user;

//after asynchronous finished,
export const referableForm =
  (anything: any): AppThunk =>
  (dispatch, getState) => {
    const currentUser = selectUser(getState());
    if (true) {
    }
  };

//export synchronous
export const { setName } = userSlice.actions;

export default userSlice.reducer;
