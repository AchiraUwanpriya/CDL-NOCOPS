import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import ModelService from '../../../services/admin/asset/ModelService';

export const PostNewModel = createAsyncThunk(
  'admin/asset/PostNewModel',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ModelService.PostNewModel(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Model Successfully Added.', alertType: 'success' }),
        );
      }
      thunkAPI.dispatch(GetModel());
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

export const GetModel = createAsyncThunk('admin/asset/GetModel', async (thunkAPI) => {
  try {
    const response = await ModelService.GetModel();
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



export const UpdateModel = createAsyncThunk(
  'admin/asset/UpdateModel',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ModelService.UpdateModel(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Model Successfully Updated.', alertType: 'success' }),
        );
      }
      thunkAPI.dispatch(GetModel());
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

export const DeleteModel = createAsyncThunk(
  'admin/asset/DeleteModel',
  async ({ id }, thunkAPI) => {
    try {
      const response = await ModelService.DeleteModel(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetModel());
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Model Successfully Deleted.', alertType: 'success' }),
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
  },
);

const initialState = { data: [], loading: false };

const modelSlices = createSlice({
  name: 'model',
  initialState,
  extraReducers: {
    [PostNewModel.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewModel.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetModel.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetModel.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateModel.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateModel.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteModel.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteModel.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = modelSlices;
export default reducer;
