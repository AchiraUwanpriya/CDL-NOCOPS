import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import CompanyService from '../../../services/admin/asset/CompanyService';

export const PostNewCompany = createAsyncThunk(
  'admin/asset/PostNewCompany',
  async ({ name, description }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('description', description);
      const response = await CompanyService.PostNewCompany(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetCompany());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Company Added Successfully', alertType: 'success' }));
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

export const GetCompany = createAsyncThunk('admin/asset/GetCompany', async (thunkAPI) => {
  try {
    const response = await CompanyService.GetCompany();
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

export const GetUserByCompany = createAsyncThunk(
  'admin/asset/GetUserByCompany',
  async (thunkAPI) => {
    try {
      const response = await CompanyService.GetUserByCompany();
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

export const UpdateCompany = createAsyncThunk(
  'admin/asset/UpdateCompany',
  async ({ id, name, description }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('Id', id);
      formData.append('Name', name);
      formData.append('description', description);
      const response = await CompanyService.UpdateCompany(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Company Updated Successfully', alertType: 'success' }));
      thunkAPI.dispatch(GetCompany());
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

export const DeleteCompany = createAsyncThunk(
  'admin/asset/DeleteCompany',
  async ({ id }, thunkAPI) => {
    try {
      const response = await CompanyService.DeleteCompany(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Company Deleted Successfully', alertType: 'success' }));
        thunkAPI.dispatch(GetCompany());
        return response;
      } else {
        // thunkAPI.dispatch(setMessage('Invalid Credentials!'));
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

const companySlices = createSlice({
  name: 'company',
  initialState,
  extraReducers: {
    [PostNewCompany.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewCompany.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetCompany.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetCompany.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetUserByCompany.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [GetUserByCompany.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateCompany.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateCompany.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteCompany.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteCompany.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = companySlices;
export default reducer;
