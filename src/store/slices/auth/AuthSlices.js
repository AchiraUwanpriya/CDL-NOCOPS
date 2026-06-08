import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from '../../services/auth/Auth.service';
import { setMessage } from '../../slices/common/Message';

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('UserName', username);
    formData.append('Password', password);
    const data = await AuthService.login(formData);
    if (data.StatusCode === 200) {
      localStorage.setItem('NocOps_Token', JSON.stringify(data.AuthKey));
      axios.defaults.headers.common['auth-key'] = data.AuthKey;
    } else if (data.StatusCode === 404){
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Invalid Credentials!', alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      
    thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
    return thunkAPI.rejectWithValue();
  }
});



export const validateToken = createAsyncThunk('auth/validateToken', async ( thunkAPI) => {
  try {
    const data = await AuthService.validateToken();
    // console.log(data);
    if (data.StatusCode === 200) {
    } else{
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Invalid Credentials!', alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.clear();
  //await AuthService.logout();
});

export const GetHeaderComponents = createAsyncThunk(
  'Access/GetHeaderComponents',
  async (thunkAPI) => {
    try {
      const response = await AuthService.GetHeaderComponents();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);
export const GetUserDetails = createAsyncThunk('UserDetails/GetUserDetails', async (thunkAPI) => {
  try {
    const response = await AuthService.GetUserDetails();
    // console.log(response.ResultSet);
    if (response.StatusCode !== 200) {
      return thunkAPI.rejectWithValue();
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    
    thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
    return thunkAPI.rejectWithValue();
  }
});

const initialState = {
  isLoggedIn: false,
  loading: false,
  headers: [],
  subHeaders: [],
  userData: {},
  validating : false,
  gettingUserData: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [validateToken.pending]: (state, action) => {
      state.validating = true;
      state.isLoggedIn = false;
    },
    [validateToken.fulfilled]: (state, action) => {
      state.validating = false;
      state.isLoggedIn = true;
    },
    [validateToken.rejected]: (state, action) => {
      state.validating = false;
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [GetHeaderComponents.fulfilled]: (state, action) => {
      state.headers = action.payload.ResultSet;
    },
    [GetHeaderComponents.rejected]: (state, action) => {
      state.headers = [];
    },
    [GetUserDetails.pending]: (state, action) => {
      state.gettingUserData = true;
    },
    [GetUserDetails.fulfilled]: (state, action) => {
      state.gettingUserData = false;
      state.userData = action.payload.ResultSet;
    },
    [GetUserDetails.rejected]: (state, action) => {
      state.gettingUserData = false;
      state.userData = {};
    },
  },
});

const { reducer } = authSlice;
export default reducer;
