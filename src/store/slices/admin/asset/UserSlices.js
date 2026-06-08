import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import UserService from '../../../services/admin/asset/UserService';

export const PostNewUser = createAsyncThunk('admin/asset/PostNewUser', async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await UserService.PostNewUser(formData);
    if (response.StatusCode !== 200) {
      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: response.StatusCode + ' ' + response.Result,
          alertType: 'error',
        }),
      );
      return thunkAPI.rejectWithValue();
    } else {
      thunkAPI.dispatch(
        setMessage({ isShow: true, text: 'User Successfully Added.', alertType: 'success' }),
      );
    }
    thunkAPI.dispatch(GetUser());
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

export const GetUser = createAsyncThunk('admin/asset/GetUser', async (thunkAPI) => {
  try {
    const response = await UserService.GetUser();
    if (response.StatusCode !== 200) {
      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: response.StatusCode + ' ' + response.Result,
          alertType: 'error',
        }),
      );
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

export const GetUserByCompany = createAsyncThunk(
  'admin/asset/GetUserByCompany',
  async (thunkAPI) => {
    try {
      const response = await UserService.GetUserByCompany();
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
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

export const UpdateUser = createAsyncThunk('admin/asset/UpdateUser', async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await UserService.UpdateUser(formData);
    if (response.StatusCode !== 200) {
      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: response.StatusCode + ' ' + response.Result,
          alertType: 'error',
        }),
      );
      return thunkAPI.rejectWithValue();
    } else {
      thunkAPI.dispatch(
        setMessage({ isShow: true, text: 'User Successfully Updated.', alertType: 'success' }),
      );
    }
    thunkAPI.dispatch(GetUser());
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

export const DeleteUser = createAsyncThunk('admin/asset/DeleteUser', async ({ id }, thunkAPI) => {
  try {
    const response = await UserService.DeleteUser(id);
    if (response.StatusCode === 200) {
      thunkAPI.dispatch(GetUser());
      thunkAPI.dispatch(
        setMessage({ isShow: true, text: 'User Successfully Deleted.', alertType: 'success' }),
      );
      return response;
    } else {
      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: response.StatusCode + ' ' + response.Result,
          alertType: 'error',
        }),
      );
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

const initialState = { data: [], loading: false };

const userSlices = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [PostNewUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetUser.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetUserByCompany.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [GetUserByCompany.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteUser.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = userSlices;
export default reducer;
