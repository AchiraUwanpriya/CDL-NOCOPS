import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import CategoryService from '../../../services/admin/asset/CategoryService';

export const PostNewCategory = createAsyncThunk(
  'admin/asset/PostNewCategory',
  async ({ name, description }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Description', description);
      const response = await CategoryService.PostNewCategory(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Category Added Successfully', alertType: 'success' }));
      thunkAPI.dispatch(GetCategory());
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

export const GetCategory = createAsyncThunk('admin/asset/GetCategory', async (thunkAPI) => {
  try {
    const response = await CategoryService.GetCategory();
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

export const UpdateCategory = createAsyncThunk(
  'admin/asset/UpdateCategory',
  async ({ id, name, description }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('Id', id);
      formData.append('Name', name);
      formData.append('Description', description);
      const response = await CategoryService.UpdateCategory(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Category Updated Successfully', alertType: 'success' }));
      thunkAPI.dispatch(GetCategory());
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

export const DeleteCategory = createAsyncThunk(
  'admin/asset/DeleteCategory',
  async ({ id }, thunkAPI) => {
    console.log(id);
    try {
      const response = await CategoryService.DeleteCategory(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Category Deleted Successfully', alertType: 'success' }));
        thunkAPI.dispatch(GetCategory());
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

const categorySlices = createSlice({
  name: 'category',
  initialState,
  extraReducers: {
    [PostNewCategory.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewCategory.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetCategory.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetCategory.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateCategory.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateCategory.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteCategory.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteCategory.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = categorySlices;
export default reducer;
