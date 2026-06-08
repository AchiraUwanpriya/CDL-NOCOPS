import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import BrandService from '../../../services/admin/asset/BrandService';

export const PostNewBrand = createAsyncThunk(
  'admin/asset/PostNewBrand',
  async ({ name, description }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Description', description);
      const response = await BrandService.PostNewBrand(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetBrand());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Brand Added Successfully', alertType: 'success' }));
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

export const GetBrand = createAsyncThunk('admin/asset/GetBrand', async (thunkAPI) => {
  try {
    const response = await BrandService.GetBrand();
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

export const UpdateBrand = createAsyncThunk(
  'admin/asset/UpdateBrand',
  async ({ id, name, description }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('Id', id);
      formData.append('Name', name);
      formData.append('Description', description);
      const response = await BrandService.UpdateBrand(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Brand Updated Successfully', alertType: 'success' }));
      thunkAPI.dispatch(GetBrand());
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

export const DeleteBrand = createAsyncThunk(
  'admin/asset/DeleteBrand',
  async ({ id }, thunkAPI) => {
    try {
      const response = await BrandService.DeleteBrand(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetBrand());
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Brand Deleted Successfully', alertType: 'success' }));
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
  name: 'brand',
  initialState,
  extraReducers: {
    [PostNewBrand.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewBrand.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetBrand.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetBrand.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateBrand.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateBrand.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteBrand.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteBrand.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = companySlices;
export default reducer;
