import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import CategoryService from '../../../services/admin/helpDesk/CategoryService';

export const PostNewCategory = createAsyncThunk(
  'admin/admin/PostNewCategory',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await CategoryService.PostNewCategory(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskCategories());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Category Added Successfully', alertType: 'success' }));
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

export const GetHelpDeskCategories = createAsyncThunk('admin/admin/GetHelpDeskCategories', async (thunkAPI) => {
  try {
    const response = await CategoryService.GetHelpDeskCategories();
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
  'admin/admin/UpdateCategory',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await CategoryService.UpdateCategory(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskCategories());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Category Updated Successfully', alertType: 'success' }));
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
  'admin/admin/DeleteCategory',
  async ({ id }, thunkAPI) => {
    try {
      const response = await CategoryService.DeleteCategory(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetHelpDeskCategories());
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Category Deleted Successfully', alertType: 'success' }));
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
  name: 'helpdeskcategory',
  initialState,
  extraReducers: {
    [PostNewCategory.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewCategory.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskCategories.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskCategories.rejected]: (state, action) => {
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
