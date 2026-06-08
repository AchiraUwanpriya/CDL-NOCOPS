import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import DepartmentService from '../../../services/admin/helpDesk/DepartmentService';

export const PostNewDept = createAsyncThunk(
  'Admin/HelpDesk/PostNewDept',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await DepartmentService.PostNewDept(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskDepts());
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

export const GetHelpDeskDepts = createAsyncThunk('Admin/HelpDesk/GetHelpDeskDepts', async (thunkAPI) => {
  try {
    const response = await DepartmentService.GetHelpDeskDepts();
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

export const UpdateDept = createAsyncThunk(
  'Admin/HelpDesk/UpdateDept',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await DepartmentService.UpdateDept(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskDepts());
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

export const DeleteLocation = createAsyncThunk(
  'Admin/HelpDesk/DeleteDept',
  async ({ id }, thunkAPI) => {
    try {
      const response = await DepartmentService.DeleteLocation(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetHelpDeskDepts());
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Department Deleted Successfully', alertType: 'success' }));
        return response;
      } else {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.Result || 'Failed to delete department', alertType: 'error' }));
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
  },
);
const initialState = { data: [], loading: false };

const Admin_departmentSlices = createSlice({
  name: 'admin_department',
  initialState,
  extraReducers: {
    [PostNewDept.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewDept.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskDepts.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskDepts.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateDept.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateDept.rejected]: (state, action) => {
      state.loading = false;
    },
    // [DeleteLocation.fulfilled]: (state, action) => {
    //   state.loading = false;
    // },
    // [DeleteLocation.rejected]: (state, action) => {
    //   state.loading = false;
    // },
  },
});

const { reducer } = Admin_departmentSlices;
export default reducer;
