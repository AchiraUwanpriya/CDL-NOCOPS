import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import EquipmentTypeService from '../../../services/admin/asset/EquipmentTypeService';

export const PostNewEqType = createAsyncThunk(
  'admin/asset/PostNewEqType',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await EquipmentTypeService.PostNewEqType(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Equipment Type Successfully Added.', alertType: 'success' }),
        );
      }
      thunkAPI.dispatch(GetEqType());
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

export const GetEqType = createAsyncThunk('admin/asset/GetEqType', async (thunkAPI) => {
  try {
    const response = await EquipmentTypeService.GetEqType();
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


export const UpdateEqType = createAsyncThunk(
  'admin/asset/UpdateEqType',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await EquipmentTypeService.UpdateEqType(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Equipment Type Successfully Updated.', alertType: 'success' }),
        );
      }
      thunkAPI.dispatch(GetEqType());
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

export const DeleteEqType = createAsyncThunk(
  'admin/asset/DeleteEqType',
  async ({ id }, thunkAPI) => {
    try {
      const response = await EquipmentTypeService.DeleteEqType(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Equipment Type Successfully Deleted.', alertType: 'success' }),
        );
        thunkAPI.dispatch(GetEqType());
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

const equipmentTypeSlices = createSlice({
  name: 'equipmentType',
  initialState,
  extraReducers: {
    [PostNewEqType.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewEqType.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetEqType.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetEqType.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateEqType.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateEqType.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteEqType.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteEqType.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = equipmentTypeSlices;
export default reducer;
